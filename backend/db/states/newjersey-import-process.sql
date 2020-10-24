./csv2pg.py ./states/newjersey_counties.csv import_newjersey_counties
./csv2pg.py ./states/newjersey_locations.csv import_newjersey_locations

UPDATE import_newjersey_locations
SET location_name1 = initcap(location_name1)
WHERE location_name1 = upper(location_name1);

UPDATE import_newjersey_locations
SET location_name2 = initcap(location_name2)
WHERE location_name2 = upper(location_name2);

UPDATE import_newjersey_locations
SET address_1 = initcap(address_1)
WHERE address_1 = upper(address_1);

UPDATE import_newjersey_locations
SET address_2 = initcap(address_2)
WHERE address_2 = upper(address_2);

UPDATE import_newjersey_locations
SET city = initcap(city)
WHERE city = upper(city);

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_newjersey_counties
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'NJ'
)
;

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_newjersey_locations
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'NJ'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_newjersey_counties imp ON j.name = imp.county
WHERE s.abbreviation = 'NJ'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_newjersey_locations imp ON j.name = imp.county
WHERE s.abbreviation = 'NJ'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_selectorcreate(jurisdiction_id, user_id)
FROM
(
	SELECT DISTINCT j.id jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newjersey_locations imp ON j.name = imp.county
	CROSS JOIN public.user u
	WHERE s.abbreviation = 'NJ'
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newjersey_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'NJ'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone2
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newjersey_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'NJ'
AND u.email = 'drew@anullvalue.net'
AND imp.phone2 IS NOT NULL
AND trim(imp.phone2) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newjersey_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'NJ'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert the schedule-described locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name1 || ' - ' || imp.location_name2, imp.address_1, imp.address_2, imp.city, 'NJ', imp.zip, 'newjersey-description' tempstring, 'description',
CASE WHEN (trim(imp.schedule_date) = '') THEN 'Unknown' ELSE trim(imp.schedule_date) END
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newjersey_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'NJ'
AND u.email = 'drew@anullvalue.net'
AND schedule_type = 'description'
;

-- insert the continuous locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, continuous_open_date, continuous_open_time, continuous_close_date, continuous_close_time)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name1 || ' - ' || imp.location_name2, imp.address_1, imp.address_2, imp.city, 'NJ', imp.zip, 'newjersey-continuous' tempstring, 'continuous',
imp.schedule_date::date, '23:59:59', '2020-11-03'::date, '20:00:00'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newjersey_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'NJ'
AND u.email = 'drew@anullvalue.net'
AND schedule_type = 'continuous'
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newjersey_locations imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'NJ'
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
	INNER JOIN import_newjersey_locations imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'NJ'
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT DISTINCT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newjersey_locations imp ON j.name = imp.county
	WHERE s.abbreviation = 'NJ'
)
;

DROP TABLE import_newjersey_locations;
DROP TABLE import_newjersey_counties;
