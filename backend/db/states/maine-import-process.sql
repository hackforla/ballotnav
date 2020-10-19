./csv2pg.py ./states/maine.csv import_maine

ALTER TABLE import_maine
ADD COLUMN name TEXT;

UPDATE import_maine
SET address_2 = address_1,
address_1 = ''
WHERE address_1 LIKE 'PO%'
AND (trim(address_2) = ''
	 OR trim(address_2) = trim(address_1));

UPDATE import_maine
SET address_2 = address_1,
address_1 = address_2
WHERE trim(address_1) <> ''
AND trim(address_2) <> ''
AND trim(address_1) <> trim(address_2)
AND address_1 LIKE 'PO%'
AND address_2 NOT LIKE 'PO%'
;

UPDATE import_maine SET name = municipality;

INSERT INTO public.jurisdiction (state_id, name, is_eaj, is_eaj_exclusive)
SELECT DISTINCT s.id, imp.name, true, true
FROM import_maine imp
CROSS JOIN state s
WHERE s.abbreviation = 'ME'
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maine imp ON j.name = imp.name
CROSS JOIN public.user u
WHERE s.abbreviation = 'ME'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maine imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'ME'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maine imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'ME'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Clerk of ' || j.name, initcap(imp.address_1), initcap(imp.address_2), initcap(imp.city), imp.state_2, imp.zip, 'maine-clerk' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maine imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'ME'
AND u.email = 'drew@anullvalue.net'
AND trim(imp.address_1) <> ''
;

-- correct the authority name
UPDATE wip_jurisdiction
SET authority_name = t0.authority_name
FROM (
	SELECT cwj.wip_jurisdiction_id, imp.clerk || ', Clerk of ' || j.name authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_maine imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'ME'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- insert the PO boxes; for the others we don't know what constitutes a mailing address
UPDATE wip_jurisdiction
SET mail_address1 = t0.mail_address1,
mail_address2 = t0.mail_address2
FROM (
	SELECT cwj.wip_jurisdiction_id, imp.address_2 mail_address1, imp.city || ', ' || imp.state_2 || ' ' || imp.zip mail_address2
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_maine imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'ME'
	AND u.email = 'drew@anullvalue.net'
	AND imp.address_2 LIKE 'PO%'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_maine imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'ME'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(cwj.wip_jurisdiction_id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maine imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
WHERE s.abbreviation = 'ME'
AND u.email = 'drew@anullvalue.net'
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_maine imp ON j.name = imp.name
	WHERE s.abbreviation = 'ME'
)
;

DROP TABLE import_maine;
