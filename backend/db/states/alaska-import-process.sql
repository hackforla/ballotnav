./csv2pg.py ./states/alaska.csv import_alaska

-- alaska is different. they have a single state-wide jurisdiction.

UPDATE import_alaska
SET email = null
WHERE trim(email) = ''
;
UPDATE import_alaska
SET fax = null
WHERE trim(fax) = ''
;
UPDATE import_alaska
SET phone = null
WHERE trim(phone) = ''
;


-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_alaska
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(t0.jurisdiction_id, t0.user_id)
FROM (
	SELECT DISTINCT j.id jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	CROSS JOIN public.user u
	WHERE s.abbreviation = 'AK'
	AND j.is_eaj IS TRUE
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- insert the drop boxes
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, city, state, zip, tempstring, schedule_type, schedule_description, contact_email, contact_fax, contact_phone)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name, imp.address_1, imp.city, imp.state, imp.zip, 'alaska-import' tempstring, 'description' schedule_type, 'Unknown', imp.email, imp.fax, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN import_alaska imp
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'AK'
AND u.email = 'drew@anullvalue.net'
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'AK'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(t0.wip_jurisdiction_id, t0.user_id)
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'AK'
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
	WHERE s.abbreviation = 'AK'
)
;

DROP TABLE import_alaska;
