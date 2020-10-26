./csv2pg.py ./states/hawaii_counties.csv import_hawaii_counties
./csv2pg.py ./states/hawaii_locations.csv import_hawaii_locations

UPDATE import_hawaii_counties
SET county = county || ' County'
WHERE county NOT LIKE '%County'
AND county NOT LIKE '%City';

UPDATE import_hawaii_locations
SET county = replace(replace(county,'City & County of ',''),'County of ','')
;

UPDATE import_hawaii_locations
SET county = county || ' County'
WHERE county NOT LIKE '%County'
;

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_hawaii_counties
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'HI'
)
;

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_hawaii_locations
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'HI'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_hawaii_counties imp ON j.name = imp.county
WHERE s.abbreviation = 'HI'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_hawaii_locations imp ON j.name = imp.county
WHERE s.abbreviation = 'HI'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_selectorcreate(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_counties imp ON j.name = imp.county
CROSS JOIN public.user u
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number, description)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone, imp.phone_note
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number, description)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.fax, imp.fax_note
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- inserts tty record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.tty
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND imp.tty IS NOT NULL
AND trim(imp.tty) <> ''
AND pnt.name = 'TTY'
;

-- insert email addresses
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT DISTINCT cwj.wip_jurisdiction_id, urlt.id, imp.email, imp.email
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_counties imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'E-Mail Address'
;

INSERT INTO facilitytype(name)
SELECT DISTINCT "location_type"
FROM public.import_hawaii_locations
WHERE lower("location_type") NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the schedule-described locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name, imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'hawaii-description' tempstring, 'description',
CASE WHEN (trim(imp.hour_description) = '') THEN 'Unknown' ELSE trim(imp.hour_description) END
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND schedule_type = 'description'
;

-- insert the continuous locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, continuous_open_date, continuous_open_time, continuous_close_date, continuous_close_time)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name, imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'hawaii-continuous' tempstring, 'continuous',
imp.continuous_begin_date::date, imp.continuous_begin_time, imp.continuous_end_date::date, imp.continuous_end_time
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND schedule_type = 'continuous'
;

-- insert the hours locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name, imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'hawaii-hours' tempstring, 'hours'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND schedule_type = 'hours'
;

-- insert the pre-nov3 hours for those locations
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT wl.id, imp.hours_start_date::date, imp.hours_stop_date::date, hrs.begin_hour, hrs.end_hour, hrs.use_monday, hrs.use_tuesday, hrs.use_wednesday, hrs.use_thursday, hrs.use_friday, hrs.use_saturday, hrs.use_sunday
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
INNER JOIN wip_location wl ON cwj.wip_jurisdiction_id = wl.wip_jurisdiction_id AND imp.location_name = wl.name
CROSS JOIN ingress_hoursstatementtotable(initcap(imp.hours)) hrs
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND imp.schedule_type = 'hours'
ORDER BY wl.id
;

-- insert the nov3 hours for those locations
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT wl.id, '2020-11-03'::date, '2020-11-03'::date, '07:00:00', '19:00:00', false, true, false, false, false, false, false
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_hawaii_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
INNER JOIN wip_location wl ON cwj.wip_jurisdiction_id = wl.wip_jurisdiction_id AND imp.location_name = wl.name
WHERE s.abbreviation = 'HI'
AND u.email = 'drew@anullvalue.net'
AND imp.schedule_type = 'hours'
ORDER BY wl.id
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_hawaii_counties imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'HI'
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
	INNER JOIN import_hawaii_counties imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'HI'
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
	INNER JOIN import_hawaii_counties imp ON j.name = imp.county
	WHERE s.abbreviation = 'HI'
)
;

DROP TABLE import_hawaii_locations;
DROP TABLE import_hawaii_counties;
