./csv2pg.py ./states/michigan.csv import_michigan

ALTER TABLE import_michigan
ADD COLUMN name TEXT;

UPDATE import_michigan
SET name = location_name || ' (' || county || ')'
;

INSERT INTO public.jurisdiction (state_id, name, is_eaj, is_eaj_exclusive)
SELECT s.id, mi.name, true, true
FROM import_michigan mi
CROSS JOIN state s
WHERE s.abbreviation = 'MI'
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_michigan imp ON j.name = imp.name
CROSS JOIN public.user u
WHERE s.abbreviation = 'MI'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_michigan imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'MI'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

-- insert email addresses
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, imp.email, imp.email
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_michigan imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'MI'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'Clerk Email Address'
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Clerk of ' || j.name, initcap(imp.address_1), initcap(imp.address_2), initcap(imp.city), 'MI', imp.zip, 'michigan-clerk-office' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_michigan imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'MI'
AND u.email = 'drew@anullvalue.net'
AND trim(imp.address_1) <> ''
;

-- correct the authority name
UPDATE wip_jurisdiction
SET authority_name = t0.authority_name
FROM (
	SELECT cwj.wip_jurisdiction_id, imp.notes || ', Clerk of ' || j.name authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_michigan imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MI'
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
	INNER JOIN import_michigan imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MI'
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
	INNER JOIN import_michigan imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MI'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(cwj.wip_jurisdiction_id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_michigan imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
WHERE s.abbreviation = 'MI'
AND u.email = 'drew@anullvalue.net'
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_michigan imp ON j.name = imp.name
	WHERE s.abbreviation = 'MI'
)
;

DROP TABLE import_michigan;
