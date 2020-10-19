./csv2pg.py ./states/rhodeisland.csv import_rhodeisland

-- rhode island is different. they have a single state-wide jurisdiction.

UPDATE import_rhodeisland
SET location_type = 'Town Hall'
WHERE address_1 LIKE '%Town Hall%'
;
UPDATE import_rhodeisland
SET location_type = 'City Hall'
WHERE address_1 LIKE '%City Hall%'
;
UPDATE import_rhodeisland
SET location_type = 'Unknown'
WHERE location_type NOT IN ('City Hall','Town Hall')
;
UPDATE import_rhodeisland
SET address_1 = replace(replace(address_1,'Town Hall ',''),'City Hall ','')
;
UPDATE import_rhodeisland
SET zip = '0'||zip
;

-- ensure that facilitytype has what we need
INSERT INTO facilitytype(name)
SELECT DISTINCT location_type
FROM public.import_rhodeisland
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
	WHERE s.abbreviation = 'RI'
	AND j.is_eaj IS TRUE
	AND u.email = 'drew@anullvalue.net'
) t0
;

-- insert the drop boxes
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, city, state, zip, tempstring, schedule_type, is_drop_box, continuous_open_date, continuous_open_time, continuous_close_date, continuous_close_time)
SELECT cwj.wip_jurisdiction_id, ft.id, imp.county, imp.address_1, imp.city, imp.state, imp.zip, 'rhodeisland-import' tempstring, 'continuous' schedule_type, 'Y', '2020-10-14'::date,'08:00','2020-11-03'::date, '20:00'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN import_rhodeisland imp
INNER JOIN facilitytype ft ON lower(imp.location_type) = lower(ft.name)
WHERE s.abbreviation = 'RI'
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
	WHERE s.abbreviation = 'RI'
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
	WHERE s.abbreviation = 'RI'
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
	WHERE s.abbreviation = 'RI'
)
;

DROP TABLE import_rhodeisland;
