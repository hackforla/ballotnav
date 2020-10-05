DROP VIEW public.jurisdiction_json;

UPDATE
	public.location
SET
	geom_latitude = NULL
	, geom_longitude = NULL
WHERE
	geom_latitude = 'NULL'
	OR geom_longitude = 'NULL';

ALTER TABLE public.location
	ALTER COLUMN geom_latitude SET DATA TYPE NUMERIC USING geom_latitude::numeric ,
	ALTER COLUMN geom_longitude SET DATA TYPE NUMERIC USING geom_longitude::numeric ,
	ADD COLUMN geom_data_note TEXT ,
	ADD CONSTRAINT wip_location_geom_latitude_valck CHECK (geom_latitude >= - 90 AND geom_latitude <= 90) ,
	ADD CONSTRAINT wip_location_geom_longitude_valck CHECK (geom_longitude >= - 180 AND geom_longitude <= 180);

ALTER TABLE public.wip_location
	DROP COLUMN latitude ,
	DROP COLUMN longitude ,
	DROP COLUMN geom_point ,
	ADD COLUMN geom_latitude NUMERIC ,
	ADD COLUMN geom_longitude NUMERIC ,
	ADD COLUMN geom_data_source TEXT ,
	ADD COLUMN geom_data_note TEXT ,
	ADD CONSTRAINT wip_location_geom_latitude_valck CHECK (geom_latitude >= - 90 AND geom_latitude <= 90) ,
	ADD CONSTRAINT wip_location_geom_longitude_valck CHECK (geom_longitude >= - 180 AND geom_longitude <= 180);

CREATE OR REPLACE VIEW public.jurisdiction_json AS
SELECT
	j.id
	, json_build_object('id' , j.id , 'name' , j.name , 'authorityName' , COALESCE(j.authority_name , ''::text) , 'mailingAddress1' , j.mail_address1 , 'mailingAddress2' , j.mail_address2 , 'mailingAddress3' , j.mail_address3 , 'fips' , json_build_object('category' , j.fips_category , 'stateCode' , s_r.fips_code , 'countyCode' , j.fips_county_code , 'completeCountyCode' , j.fips_complete_county_code) , 'importantDates' , COALESCE(t_js_impdates.dates_json , '[]'::json) , 'locations' , COALESCE(t_js_loc.locations_json , '[]'::json) , 'phones' , COALESCE(t_js_phone.tn_json , '[]'::json) , 'urls' , COALESCE(t_js_url.urls_json , '[]'::json) , 'news' , COALESCE(t_js_news.news_json , '[]'::json) , 'notices' , COALESCE(t_js_notices.notices_json , '[]'::json) , 'infotabs' , COALESCE(t_js_infotabs.infotabs_json , '[]'::json)) AS jurisdiction_json
FROM
	jurisdiction j
	JOIN state s_r ON j.state_id = s_r.id
	LEFT JOIN (
		SELECT
			t99.jurisdiction_id
			, array_to_json(array_agg(t99.location_json)) AS locations_json
		FROM (
			SELECT
				l.jurisdiction_id
				, l.id
				, json_build_object('id' , l.id , 'name' , l.name , 'infoPublic' , COALESCE(l.info_public , ''::text) , 'address1' , COALESCE(l.address1 , ''::text) , 'address2' , COALESCE(l.address2 , ''::text) , 'address3' , COALESCE(l.address3 , ''::text) , 'contactName' , COALESCE(l.contact_name) , 'contactEmail' , COALESCE(l.contact_email) , 'contactFax' , COALESCE(l.contact_fax) , 'contactPhone' , COALESCE(l.contact_phone) , 'geomCoordinates' , COALESCE((l.geom_latitude || ','::text) || l.geom_longitude , ''::text) , 'isEarlyDropoffLocation' , l.is_early_dropoff_location , 'isEarlyVotingLocation' , l.is_early_voting_location , 'isElectionsOffice' , l.is_elections_office , 'isPollingLocation' , l.is_polling_location , 'isDropBox' , l.is_drop_box , 'isHandicapAccessible' , l.is_handicap_accessible , 'isStaffedLocation' , l.is_staffed_location , 'timezone' , COALESCE(l.timezone , ''::text) , 'scheduleType' , CASE WHEN l_h.hours_json IS NULL
					AND l.schedule_type = 'hours'::enum_location_schedule_type THEN
					'description'::enum_location_schedule_type
				ELSE
					COALESCE(l.schedule_type , 'description'::enum_location_schedule_type)
				END , 'scheduleDescription' , COALESCE(l.schedule_description , ''::text) , 'continuousOpen' , COALESCE(to_char(timezone(l.timezone , to_char((l.continuous_open_date + l.continuous_open_time::time WITHOUT time zone)::timestamp WITHOUT time zone , 'YYYY-MM-DD HH24:MI:SS'::text)::timestamp WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SSOF'::text) , ''::text) , 'continuousClose' , COALESCE(to_char(timezone(l.timezone , to_char((l.continuous_close_date + l.continuous_close_time::time WITHOUT time zone)::timestamp WITHOUT time zone , 'YYYY-MM-DD HH24:MI:SS'::text)::timestamp WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SSOF'::text) , ''::text) , 'facilityTypeId' , ft.id , 'facilityTypeName' , ft.name , 'hours' , COALESCE(l_h.hours_json , '[]'::json)) AS location_json
			FROM
				LOCATION l
			JOIN facilitytype ft ON l.facilitytype_id = ft.id
			LEFT JOIN (
				SELECT
					sub.location_id
					, array_to_json(array_agg(sub.x) , FALSE) AS hours_json
				FROM (
					SELECT
						ldh.location_id
						, json_build_object(ldh.date_actual , array_agg(json_build_object('date' , ldh.date_actual , 'openTime' , ldh.open_time , 'closeTime' , ldh.close_time , 'openTimeStamp' , ldh.open_timestamp , 'closeTimeStamp' , ldh.close_timestamp , 'note' , COALESCE(ldh.note , ''::text)))) AS x
					FROM
						location_dailyhours ldh
					GROUP BY
						ldh.location_id
						, ldh.date_actual
					ORDER BY
						ldh.location_id
						, ldh.date_actual) sub
				GROUP BY
					sub.location_id) l_h ON l.id = l_h.location_id) t99
		GROUP BY
			t99.jurisdiction_id) t_js_loc ON j.id = t_js_loc.jurisdiction_id
	LEFT JOIN (
		SELECT
			t0.jurisdiction_id
			, array_to_json(array_agg(t0.tn_json) , TRUE) AS tn_json
		FROM (
			SELECT
				sp.jurisdiction_id
				, json_build_object('id' , sp.id , 'number' , sp.phone_number , 'description' , COALESCE(sp.description , ''::text) , 'phoneNumberTypeName' , pnt.name , 'sortOrder' , pnt.sort_order * 10 + sp.sort_order) AS tn_json
			FROM
				jurisdiction_phone sp
				JOIN phonenumbertype pnt ON sp.phonenumbertype_id = pnt.id
			ORDER BY
				(pnt.sort_order * 10 + sp.sort_order)) t0
		GROUP BY
			t0.jurisdiction_id) t_js_phone ON j.id = t_js_phone.jurisdiction_id
	LEFT JOIN (
		SELECT
			t0.jurisdiction_id
			, array_to_json(array_agg(t0.url_json) , TRUE) AS urls_json
		FROM (
			SELECT
				u.jurisdiction_id
				, json_build_object('id' , u.id , 'urlTypeId' , ut.id , 'urlTypeName' , ut.name , 'isEmail' , ut.is_email , 'url' , CASE WHEN u.url !~~ 'http%'::text
						AND ut.is_email = FALSE THEN
						'https://'::text || u.url
					ELSE
						u.url
					END , 'name' , COALESCE(u.name , ut.name , ''::text) , 'description' , COALESCE(u.description , ''::text)) AS url_json
			FROM
				jurisdiction_url u
			JOIN urltype ut ON u.urltype_id = ut.id
		ORDER BY
			u.id) t0
	GROUP BY
		t0.jurisdiction_id) t_js_url ON j.id = t_js_url.jurisdiction_id
	LEFT JOIN (
		SELECT
			t0.jurisdiction_id
			, array_to_json(array_agg(t0.newslink_json) , TRUE) AS news_json
		FROM (
			SELECT
				nl.jurisdiction_id
				, json_build_object('id' , nl.id , 'datePosted' , to_char(nl.date_posted , 'YYYY-MM-DD HH24:MI:SS'::text) , 'jurisdictionId' , nl.jurisdiction_id , 'caption' , nl.caption , 'url' , nl.url , 'summary' , nl.summary) AS newslink_json
			FROM
				jurisdiction_news nl
			ORDER BY
				nl.date_posted DESC) t0
		GROUP BY
			t0.jurisdiction_id) t_js_news ON j.id = t_js_news.jurisdiction_id
	LEFT JOIN (
		SELECT
			t0.jurisdiction_id
			, array_to_json(array_agg(t0.notice_json) , TRUE) AS notices_json
		FROM (
			SELECT
				jn.jurisdiction_id
				, json_build_object('id' , jn.id , 'severity' , jn.severity , 'message' , jn.message , 'datePosted' , to_char(jn.date_posted , 'YYYY-MM-DD HH24:MI:SS'::text)) AS notice_json
			FROM
				jurisdiction_notice jn
			ORDER BY
				jn.date_posted
				, jn.id DESC) t0
		GROUP BY
			t0.jurisdiction_id) t_js_notices ON j.id = t_js_notices.jurisdiction_id
	LEFT JOIN (
		SELECT
			t0.jurisdiction_id
			, array_to_json(array_agg(t0.infotab_json) , TRUE) AS infotabs_json
		FROM (
			SELECT
				ji.jurisdiction_id
				, json_build_object('id' , ji.id , 'jurisdictionId' , ji.jurisdiction_id , 'sortOrder' , ji.sort_order , 'caption' , ji.caption , 'html' , ji.html , 'type' , ji.type) AS infotab_json
			FROM
				jurisdiction_infotab ji) t0
		GROUP BY
			t0.jurisdiction_id) t_js_infotabs ON j.id = t_js_infotabs.jurisdiction_id
	LEFT JOIN (
		SELECT
			t0.jurisdiction_id
			, array_to_json(array_agg(t0.date_json)) AS dates_json
		FROM (
			SELECT
				jd.jurisdiction_id
				, json_build_object('importantDateTypeId' , dt.id , 'importantDateTypeName' , dt.name , 'dateType' , dt.date_type , 'beginTime' , to_char((jd.begin_date + jd.begin_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SS'::text) , 'endTime' , to_char((jd.end_date + jd.end_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SS'::text) , 'note' , COALESCE(jd.note , ''::text)) AS date_json
			FROM
				jurisdiction_importantdate jd
				JOIN importantdatetype dt ON jd.importantdatetype_id = dt.id
			ORDER BY
				jd.end_time
				, dt.name) t0
		GROUP BY
			t0.jurisdiction_id) t_js_impdates ON j.id = t_js_impdates.jurisdiction_id;

