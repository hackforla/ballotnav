
UPDATE import_indiana
SET county = initcap(county),
name = initcap(name);

UPDATE import_indiana
SET name = replace(name,'''S','''s');

UPDATE import_indiana
SET county = (trim(county)) || ' County'
WHERE county NOT LIKE '% County';

UPDATE import_indiana
SET county = 'DeKalb County'
WHERE county = 'Dekalb County';

UPDATE import_indiana
SET county = 'LaGrange County'
WHERE county = 'Lagrange County';

UPDATE import_indiana
SET county = 'LaPorte County'
WHERE county = 'Laporte County';

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_indiana
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'IN'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, j.name, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_indiana imp ON j.name = imp.county
WHERE s.abbreviation = 'IN'
GROUP BY j.id, j.name
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(t0.jurisdiction_id, t0.user_id)
FROM (
	SELECT DISTINCT j.id jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_indiana imp ON j.name = imp.county
	CROSS JOIN public.user u
	WHERE s.abbreviation = 'IN'
	AND u.email = 'drew@anullvalue.net'
	) t0
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT DISTINCT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_indiana imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'IN'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT DISTINCT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_indiana imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'IN'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_indiana
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.name, initcap(imp.address_1), initcap(imp.address_2), initcap(imp.city), imp.state_2, imp.zip, 'indiana' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_indiana imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'IN'
AND u.email = 'drew@anullvalue.net'
AND trim(imp.address_1) <> ''
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_indiana imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'IN'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(wip_jurisdiction_id, user_id)
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id wip_jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_indiana imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'IN'
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
	INNER JOIN import_indiana imp ON j.name = imp.county
	WHERE s.abbreviation = 'IN'
)
;

DROP TABLE import_indiana;
