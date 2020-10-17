./csv2pg.py ./states/washington_offices.csv import_washington_offices
./csv2pg.py ./states/washington_locations.csv import_washington_locations

UPDATE import_washington_offices
SET county = county || ' County'
WHERE county NOT LIKE '%County';

UPDATE import_washington_locations
SET county = county || ' County'
WHERE county NOT LIKE '%County';

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_washington_offices
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'WA'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_washington_offices imp ON j.name = imp.county
WHERE s.abbreviation = 'WA'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_washington_offices imp ON j.name = imp.county
CROSS JOIN public.user u
WHERE s.abbreviation = 'WA'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WA'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone2
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WA'
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
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WA'
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
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'WA'
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
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'WA'
AND u.email = 'drew@anullvalue.net'
AND imp.county_website_url IS NOT NULL
AND trim(imp.county_website_url) <> ''
AND urlt.name = 'Jurisdiction Elections Website'
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_washington_offices
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

INSERT INTO facilitytype(name)
SELECT DISTINCT "type"
FROM public.import_washington_locations
WHERE lower("type") NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.county || ' Elections Office', imp.address_1, imp.address_2, imp.address_city, 'WA', imp.address_zip, 'washington-office' tempstring, 'hours'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'WA'
AND u.email = 'drew@anullvalue.net'
;

-- insert the hours
-- warning, this query assumes that all locations per-wip-jurisdiction have the same hours. you must manually verify that this is true. if it is not, you must rewrite accordingly.
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, note, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT DISTINCT wl.id,now(), '2020-11-02'::date, hrst.begin_hour, hrst.end_hour, null, hrst.use_monday, hrst.use_tuesday, hrst.use_wednesday, hrst.use_thursday, hrst.use_friday, hrst.use_saturday, hrst.use_sunday
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_washington_offices imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN wip_location wl ON cwj.wip_jurisdiction_id = wl.wip_jurisdiction_id
CROSS JOIN ingress_hoursstatementtotable(imp.hours) hrst
WHERE s.abbreviation = 'WA'
AND u.email = 'drew@anullvalue.net'
AND wl.tempstring = 'washington-office'
;

-- insert the additional locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description, display_note)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.place, imp.address_1, imp.address_2, imp.city, 'WA', imp.zip, 'washington-location' tempstring, 'description', 'See notes', imp.description
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_washington_locations imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."type") = lower(ft.name)
WHERE s.abbreviation = 'WA'
AND u.email = 'drew@anullvalue.net'
;

-- correct the mailing address
UPDATE wip_jurisdiction
SET mail_address1 = t0.mail_address1,
mail_address2 = t0.mail_address2
FROM (
	SELECT cwj.wip_jurisdiction_id, imp.mail_address_1 mail_address1, imp.mail_city || ', WA ' || imp.mail_zip mail_address2
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_washington_offices imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WA'
	AND u.email = 'drew@anullvalue.net'
	AND imp.mail_address_1 IS NOT NULL
	AND trim(imp.mail_address_1) <> ''
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
	INNER JOIN import_washington_offices imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WA'
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
	INNER JOIN import_washington_offices imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WA'
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
	INNER JOIN import_washington_offices imp ON j.name = imp.county
	WHERE s.abbreviation = 'WA'
)
;

DROP TABLE import_washington_locations;
DROP TABLE import_washington_offices;
