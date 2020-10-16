./csv2pg.py ./states/illinois.csv import_illinois

UPDATE import_illinois
SET county = trim(county) || ' County'
WHERE county NOT LIKE '%County';

UPDATE import_illinois
SET county = REPLACE(county,'City of ','') || ' City'
WHERE county LIKE 'City of%';

UPDATE import_illinois
SET county = 'Jo Daviess County'
WHERE county = 'JoDaviess County';

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_illinois
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'IL'
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
	LEFT OUTER JOIN import_illinois imp ON j.name = imp.county
	WHERE s.abbreviation = 'IL'
	GROUP BY j.id
	HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
) t0 ON j.id = t0.id
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_illinois imp ON j.name = imp.county
CROSS JOIN public.user u
WHERE s.abbreviation = 'IL'
AND u.email = 'drew@anullvalue.net'
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_illinois
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description, display_note)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name, imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'illinois' tempstring, 'description', imp.hours, imp.notes
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_illinois imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'IL'
AND u.email = 'drew@anullvalue.net'
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_illinois imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'IL'
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
	INNER JOIN import_illinois imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'IL'
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
	INNER JOIN import_illinois imp ON j.name = imp.county
	WHERE s.abbreviation = 'IL'
)
;

DROP TABLE import_illinois;
