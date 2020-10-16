./csv2pg.py ./states/delaware.csv import_delaware

UPDATE import_delaware
SET county = trim(county) || ' County'
WHERE county NOT LIKE '%County';

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_delaware
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'DE'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT t0.*, j.*
FROM jurisdiction j
INNER JOIN  (
	SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	LEFT OUTER JOIN import_delaware imp ON j.name = imp.county
	WHERE s.abbreviation = 'DE'
	GROUP BY j.id
	HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
) t0 ON j.id = t0.id
ORDER BY j.name;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_delaware imp ON j.name = imp.county
CROSS JOIN public.user u
WHERE s.abbreviation = 'DE'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_delaware imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'DE'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_delaware imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'DE'
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
INNER JOIN import_delaware imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'DE'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'E-Mail Address'
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_delaware
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description, internal_note)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name || ' (' || j.name || ')', imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'delaware' tempstring, 'description', imp.hours, null
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_delaware imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'DE'
AND u.email = 'drew@anullvalue.net'
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_delaware imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'DE'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(wip_jurisdiction_id, user_id)
FROM
(
	SELECT DISTINCT cwj.wip_jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_delaware imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'DE'
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
	INNER JOIN import_delaware imp ON j.name = imp.county
	WHERE s.abbreviation = 'DE'
)
;

DROP TABLE import_delaware;
