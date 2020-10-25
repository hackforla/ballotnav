./csv2pg.py ./states/massachusetts.csv import_massachusetts

ALTER TABLE import_massachusetts
ADD COLUMN name TEXT;

UPDATE import_massachusetts
SET name = trim(initcap(city)),
dropbox_city = CASE WHEN trim(dropbox_city) = '' THEN trim(initcap(city)) ELSE trim(dropbox_city) END;

INSERT INTO public.jurisdiction (state_id, name, is_eaj, is_eaj_exclusive)
SELECT DISTINCT s.id, imp.name, true, true
FROM import_massachusetts imp
CROSS JOIN state s
WHERE s.abbreviation = 'MA'
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_selectorcreate(jurisdiction_id, user_id)
FROM (
	SELECT DISTINCT j.id jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_massachusetts imp ON j.name = imp.name
	CROSS JOIN public.user u
	WHERE s.abbreviation = 'MA'
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT DISTINCT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_massachusetts imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'MA'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert email addresses
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT DISTINCT cwj.wip_jurisdiction_id, urlt.id, imp.email, imp.email
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_massachusetts imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'MA'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'Clerk Email Address'
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, j.name, trim(imp.address_1), trim(imp.address_2), imp.name, imp.state_2, 'massachusetts' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_massachusetts imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'MA'
AND u.email = 'drew@anullvalue.net'
AND imp.address_1 IS NOT NULL
AND trim(imp.address_1) <> ''
;

-- insert the drop boxes
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, city, state, tempstring, schedule_type, schedule_description, display_note)
SELECT cwj.wip_jurisdiction_id, ft.id, j.name, trim(imp.dropbox_address), imp.dropbox_city, imp.state_2, 'massachusetts' tempstring, 'description', 'Unknown', imp.dropbox_notes
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_massachusetts imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'MA'
AND u.email = 'drew@anullvalue.net'
AND imp.dropbox_address IS NOT NULL
AND trim(imp.dropbox_address) <> ''
AND lower(trim(imp.dropbox_address)) <> lower(trim(imp.address_1))
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_massachusetts imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MA'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(wip_jurisdiction_id, user_id)
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_massachusetts imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MA'
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_massachusetts imp ON j.name = imp.name
	WHERE s.abbreviation = 'MA'
)
;

DROP TABLE import_massachusetts;
