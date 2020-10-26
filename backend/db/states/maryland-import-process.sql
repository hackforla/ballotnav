./csv2pg.py ./states/maryland-offices.csv import_maryland_offices
./csv2pg.py ./states/maryland-locations.csv import_maryland_locations

UPDATE import_maryland_offices
SET county = county || ' County'
WHERE county NOT LIKE '%County'
AND county NOT LIKE '%City';

UPDATE import_maryland_locations
SET county = county || ' County'
WHERE county NOT LIKE '%County'
AND county NOT LIKE '%City';

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_maryland_offices
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'MD'
)
;

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_maryland_locations
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'MD'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_maryland_offices imp ON j.name = imp.county
WHERE s.abbreviation = 'MD'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_maryland_locations imp ON j.name = imp.county
WHERE s.abbreviation = 'MD'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maryland_offices imp ON j.name = imp.county
CROSS JOIN public.user u
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maryland_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'MD'
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
INNER JOIN import_maryland_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'MD'
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
INNER JOIN import_maryland_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'E-Mail Address'
;

-- insert county URL
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, CASE WHEN (left(imp.county_website_url,4)<>'http') THEN 
'https://'||imp.county_website_url
ELSE imp.county_website_url
END AS website_url, j.name
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maryland_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
AND imp.county_website_url IS NOT NULL
AND trim(imp.county_website_url) <> ''
AND urlt.name = 'Jurisdiction Elections Website'
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_maryland_offices
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

INSERT INTO facilitytype(name)
SELECT DISTINCT "location_type"
FROM public.import_maryland_locations
WHERE lower("location_type") NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.county || ' Elections Office', imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'maryland-office' tempstring, 'description'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maryland_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
;

-- insert the additional locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.location_name, imp.address1, imp.address2, imp.city, imp.state_2, imp.zip, 'maryland-location' tempstring, 'description'
, CASE WHEN (trim(imp.dates) <> '' AND trim(imp.hours) <> '') THEN trim(imp.dates || ' - ' || imp.hours) ELSE trim(imp.dates || imp.hours) END 
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_maryland_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
;

-- insert the additional location hours for early voting locations
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, note, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT DISTINCT wl.id, '2020-10-26'::date, '2020-11-02'::date, '07:00:00','20:00:00',null, true, true, true, true, true, true, true
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN public.wip_jurisdiction wj ON cwj.wip_jurisdiction_id = wj.id
INNER JOIN public.wip_location wl ON wl.wip_jurisdiction_id = wj.id
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
AND trim(wl.schedule_description) LIKE '2020-10-26 to 2020-11%07:00-20:00'
;

-- insert the additional location hours for election day vote centers
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, note, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT DISTINCT wl.id, '2020-11-03'::date, '2020-11-03'::date, '07:00:00','20:00:00',null, true, true, true, true, true, true, true
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN public.wip_jurisdiction wj ON cwj.wip_jurisdiction_id = wj.id
INNER JOIN public.wip_location wl ON wl.wip_jurisdiction_id = wj.id
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
AND trim(wl.schedule_description) <> ''
AND trim(wl.schedule_description) LIKE '2020/11/03 - 07:00-20:00'
;

UPDATE wip_location
SET schedule_type = 'hours'
WHERE id IN (
SELECT DISTINCT wl.id
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN public.wip_jurisdiction wj ON cwj.wip_jurisdiction_id = wj.id
INNER JOIN public.wip_location wl ON wl.wip_jurisdiction_id = wj.id
WHERE s.abbreviation = 'MD'
AND u.email = 'drew@anullvalue.net'
AND trim(wl.schedule_description) <> ''
AND (trim(wl.schedule_description) LIKE '2020/11/03 - 07:00-20:00'
	 OR trim(wl.schedule_description) LIKE '2020-10-26 to 2020-11%07:00-20:00'
	 )
)
;

-- update hours for the drop boxes
UPDATE wip_location
SET continuous_open_date = t0.continuous_open_date
, continuous_open_time = t0.continuous_open_time
, continuous_close_date = t0.continuous_close_date
, continuous_close_time = t0.continuous_close_time
, schedule_type = 'continuous'
FROM (
	SELECT wl.id, replace(left(wl.schedule_description,10),'/','-')::date continuous_open_date,
	'2020-11-03'::date continuous_close_date,
	'00:00:00' continuous_open_time,
	'20:00:00' continuous_close_time
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	INNER JOIN public.wip_jurisdiction wj ON cwj.wip_jurisdiction_id = wj.id
	INNER JOIN public.wip_location wl ON wl.wip_jurisdiction_id = wj.id
	WHERE s.abbreviation = 'MD'
	AND u.email = 'drew@anullvalue.net'
	AND trim(wl.schedule_description) <> ''
	AND trim(wl.schedule_description) LIKE '%continuously'
	AND trim(wl.schedule_description) NOT LIKE '2020/11/03 - 07:00-20:00'
	AND trim(wl.schedule_description) NOT LIKE '2020-10-26 to 2020-11%07:00-20:00'
) t0
WHERE wip_location.id = t0.id
;





-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_maryland_offices imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MD'
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
	INNER JOIN import_maryland_offices imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'MD'
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
	INNER JOIN import_maryland_offices imp ON j.name = imp.county
	WHERE s.abbreviation = 'MD'
)
;

DROP TABLE import_maryland_locations;
DROP TABLE import_maryland_offices;
