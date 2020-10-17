./csv2pg.py ./states/westvirginia.csv import_westvirginia

UPDATE import_westvirginia
SET county = county || ' County'
;

-- if you get any rows here, that means the "county" value is not appropriate
SELECT *
FROM import_westvirginia
WHERE county NOT IN (
	SELECT j.name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	WHERE s.abbreviation = 'WV'
)
;

-- any rows here means that a county fails to appear, or appears multiple times, in the import file
-- you'll need to investigate to see whether or not this is a problem
SELECT j.id, COUNT(DISTINCT imp.csv_row_id) j_count
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
LEFT OUTER JOIN import_westvirginia imp ON j.name = imp.county
WHERE s.abbreviation = 'WV'
GROUP BY j.id
HAVING COUNT(DISTINCT imp.csv_row_id) <> 1
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(t0.jurisdiction_id, t0.user_id)
FROM (
	SELECT DISTINCT j.id jurisdiction_id, u.id user_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_westvirginia imp ON j.name = imp.county
	CROSS JOIN public.user u
	WHERE s.abbreviation = 'WV'
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_westvirginia imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WV'
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
INNER JOIN import_westvirginia imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WV'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert email addresses
-- stupid party trick with grouping because one county has two clerks with different email addresses
-- and the model doesnt accommodate that
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, max(imp.email), max(imp.email)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_westvirginia imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'WV'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'E-Mail Address'
GROUP BY cwj.wip_jurisdiction_id, urlt.id
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_westvirginia
WHERE lower(location_type) NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, is_elections_office, is_staffed_location, is_drop_box, is_early_dropoff_location, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, j.name || ' - ' || imp.location_name, imp.address_1, imp.address_2, imp.city, imp.state_2, imp.zip, 'westvirginia-boe-office' tempstring, 'description', 'Y', 'Y', 'N', 'Y', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_westvirginia imp ON j.name = imp.county
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'WV'
AND u.email = 'drew@anullvalue.net'
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id, j.name || ' Board of Elections' authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_westvirginia imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WV'
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
	INNER JOIN import_westvirginia imp ON j.name = imp.county
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WV'
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
	INNER JOIN import_westvirginia imp ON j.name = imp.county
	WHERE s.abbreviation = 'WV'
)
;

DROP TABLE import_westvirginia;
