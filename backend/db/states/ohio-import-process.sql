./csv2pg.py ./states/ohio.csv import_ohio
./csv2pg.py ./states/ohio_hours.csv import_ohio_hours

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_ohio
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'OH'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_ohio imp ON j.name = imp.county
WHERE s.abbreviation = 'OH'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
CROSS JOIN public.user u
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone2
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'OH'
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
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert county URL
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, CASE WHEN (left(imp.county_website_url,4)<>'http') THEN 
'https://'||imp.county_website_url
ELSE imp.county_website_url
END AS website_url, j.name
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
AND imp.county_website_url IS NOT NULL
AND trim(imp.county_website_url) <> ''
AND urlt.name = 'Jurisdiction Elections Website'
;

-- insert email addresses
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, imp.email, imp.email
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'E-Mail Address'
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_ohio
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, is_elections_office, is_staffed_location, is_drop_box, is_early_dropoff_location)
SELECT cwj.wip_jurisdiction_id, ft.id, j.name || ' ' || imp.location_name, imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'ohio-boe-office' tempstring, 'hours', 'Y', 'Y', 'N', 'Y'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
;

-- insert the office drop boxes
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, is_elections_office, is_staffed_location, is_drop_box, continuous_open_date, continuous_open_time, continuous_close_date, continuous_close_time)
SELECT cwj.wip_jurisdiction_id, ft.id, j.name || ' ' || imp.location_name || ' drop box', imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'ohio-boe-dropbox' tempstring, 'continuous', 'N', 'N', 'Y', '2020-10-06','08:00','2020-11-03','19:30'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
;

-- insert the prescribed office hours for ohio boe offices
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, note, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT wl.id, ioh.begindate::date, ioh.enddate::date, ioh.opentime, ioh.closetime, ioh.note, true, true, true, true, true, true, true
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN wip_location wl ON cwj.wip_jurisdiction_id = wl.wip_jurisdiction_id
CROSS JOIN import_ohio_hours ioh
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
AND wl.tempstring = 'ohio-boe-office'
;

-- correct the authority name
UPDATE wip_jurisdiction
SET authority_name = t0.authority_name
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_ohio imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'OH'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_ohio imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'OH'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(cwj.wip_jurisdiction_id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_ohio imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
WHERE s.abbreviation = 'OH'
AND u.email = 'drew@anullvalue.net'
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_ohio imp ON j.name = imp.county
	WHERE s.abbreviation = 'OH'
)
;

DROP TABLE import_ohio_hours;
DROP TABLE import_ohio;
