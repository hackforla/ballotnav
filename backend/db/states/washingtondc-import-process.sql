./csv2pg.py ./states/washingtondc_locations.csv import_washingtondc_locations

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_selectorcreate(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
CROSS JOIN public.user u
WHERE s.abbreviation = 'DC'
AND j.is_eaj IS TRUE
AND u.email = 'drew@anullvalue.net'
;

INSERT INTO facilitytype(name)
SELECT DISTINCT "location_type"
FROM public.import_washingtondc_locations
WHERE lower("location_type") NOT IN (
	SELECT lower(name) FROM public.facilitytype	
)
;

-- remove all existing locations from DC because i failed to import them with their latlon the first time
DELETE FROM wip_location
WHERE wip_jurisdiction_id IN (
	SELECT DISTINCT cwj.wip_jurisdiction_id wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'DC'
	AND j.is_eaj IS TRUE
	AND u.email = 'drew@anullvalue.net'
);

-- insert the continuous locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, continuous_open_date, continuous_open_time, continuous_close_date, continuous_close_time, geom_latitude, geom_longitude, geom_data_source)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Drop box @ ' || imp.location_name, imp.address_1, imp.address_2, 'Washington', 'DC', imp.zip, 'washingtondc-'||imp.entrytype tempstring, 'continuous',
imp.open_date::date, imp.open_time, imp.close_date::date, imp.close_time, imp.latitude::numeric, imp.longitude::numeric, 'washington-dc-open-data'
FROM jurisdiction j
CROSS JOIN import_washingtondc_locations imp
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'DC'
AND u.email = 'drew@anullvalue.net'
AND imp.schedule_type = 'continuous'
;

-- insert the hours locations
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, geom_latitude, geom_longitude, geom_data_source)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Vote Center @ ' || initcap(imp.location_name), initcap(imp.address_1), imp.address_2, 'Washington', 'DC', imp.zip, 'washingtondc-'||imp.entrytype tempstring, 'hours', imp.latitude::numeric, imp.longitude::numeric, 'washington-dc-open-data'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
CROSS JOIN import_washingtondc_locations imp
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN facilitytype ft ON lower(imp."location_type") = lower(ft.name)
WHERE s.abbreviation = 'DC'
AND u.email = 'drew@anullvalue.net'
AND imp.schedule_type = 'hours'
;

-- insert the hours for early vote centers
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT DISTINCT wl.id, '2020-10-27'::date, '2020-11-02'::date, '08:30','19:00', true, true, true, true, true, true, true
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN wip_location wl ON cwj.wip_jurisdiction_id = wl.wip_jurisdiction_id
WHERE s.abbreviation = 'DC'
AND u.email = 'drew@anullvalue.net'
AND wl.schedule_type = 'hours'
AND wl.tempstring='washingtondc-earlyvc'
ORDER BY wl.id
;

-- insert the hours for election day vote centers
INSERT INTO wip_location_hours (wip_location_id, begin_date, end_date, open_time, close_time, use_monday, use_tuesday, use_wednesday, use_thursday, use_friday, use_saturday, use_sunday)
SELECT DISTINCT wl.id, '2020-11-02'::date, '2020-11-02'::date, '07:00','20:00', false, true, false, false, false, false, false
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
INNER JOIN wip_location wl ON cwj.wip_jurisdiction_id = wl.wip_jurisdiction_id
WHERE s.abbreviation = 'DC'
AND u.email = 'drew@anullvalue.net'
AND wl.schedule_type = 'hours'
AND wl.tempstring='washingtondc-electionday'
ORDER BY wl.id
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT DISTINCT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'DC'
	AND j.is_eaj IS TRUE
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
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'DC'
	AND j.is_eaj IS TRUE
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
	WHERE s.abbreviation = 'DC'
	AND j.is_eaj IS TRUE
)
;

DROP TABLE import_washingtondc_locations;
