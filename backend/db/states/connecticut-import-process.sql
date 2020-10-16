./csv2pg.py ./states/connecticut.csv import_connecticut


-- SELECT * FROM import_connecticut;

ALTER TABLE import_connecticut
ADD COLUMN name TEXT;

UPDATE import_connecticut
SET name = initcap(county),
county = initcap(county),
location_type = initcap(location_type),
address_1 = initcap(address_1),
address_2 = initcap(address_2),
city = initcap(city)
;

DELETE FROM import_connecticut WHERE trim(state) = '';

INSERT INTO public.jurisdiction (state_id, name, is_eaj, is_eaj_exclusive)
SELECT s.id, imp.name, true, true
FROM import_connecticut imp
CROSS JOIN state s
WHERE s.abbreviation = 'CT'
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_connecticut imp ON j.name = imp.name
CROSS JOIN public.user u
WHERE s.abbreviation = 'CT'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_connecticut imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'CT'
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
INNER JOIN import_connecticut imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'CT'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert email addresses
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, imp.email, imp.email
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_connecticut imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'CT'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'Clerk Email Address'
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Clerk of ' || j.name, initcap(imp.address_1), initcap(imp.address_2), initcap(imp.city), 'CT', imp.zip, 'connecticut-clerk' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_connecticut imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'CT'
AND u.email = 'drew@anullvalue.net'
AND trim(imp.address_1) <> ''
;

-- correct the authority name
UPDATE wip_jurisdiction
SET authority_name = t0.authority_name
FROM (
	SELECT cwj.wip_jurisdiction_id, 'Clerk of ' || j.name authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_connecticut imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'CT'
	AND u.email = 'drew@anullvalue.net'
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
	INNER JOIN import_connecticut imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'CT'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(cwj.wip_jurisdiction_id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_connecticut imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
WHERE s.abbreviation = 'CT'
AND u.email = 'drew@anullvalue.net'
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_connecticut imp ON j.name = imp.name
	WHERE s.abbreviation = 'CT'
)
;

DROP TABLE import_connecticut;
