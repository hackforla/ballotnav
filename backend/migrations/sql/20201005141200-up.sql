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

ALTER TABLE public.location_hours
	DROP CONSTRAINT location_hours_location_id_fkey ,
	ADD CONSTRAINT location_hours_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

DROP FUNCTION jurisdiction_to_wipjurisdiction (_param_jurisdiction_id IN int , _param_user_id IN int , _out_wip_jurisdiction_id OUT int);

CREATE OR REPLACE FUNCTION wip_jurisdiction_create (_param_jurisdiction_id IN int , _param_user_id IN int , _out_wip_jurisdiction_id OUT int)
LANGUAGE plpgsql
AS $$
DECLARE
	curr_wip_jurisdiction_id int;
	curr_wip_location_id int;
	r record;
BEGIN
	IF NOT EXISTS (
		SELECT
			id
		FROM
			public.user
		WHERE
			id = _param_user_id) THEN
	RAISE EXCEPTION 'user.id= % not found' , _param_user_id
		USING HINT = 'Function can only be called with a valid user.id.';
END IF;
	IF NOT EXISTS (
		SELECT
			id
		FROM
			public.jurisdiction
		WHERE
			id = _param_jurisdiction_id) THEN
	RAISE EXCEPTION 'jurisdiction.id= % not found' , _param_jurisdiction_id
	USING HINT = 'Function can only be called with a valid jurisdiction.id.';
END IF;
INSERT INTO public.wip_jurisdiction (jurisdiction_id , edit_basis_wip_jurisdiction_id , name , authority_name , mail_address1 , mail_address2 , mail_address3 , internal_notes , timezone_default , timezone_enforced , is_validated_timezone , is_validated_importantdates , is_validated_phones , is_validated_urls , is_validated_notices , is_validated_locations , is_published , is_released , editor_user_id)
SELECT
	id
	, wip_jurisdiction_id
	, name
	, authority_name
	, mail_address1
	, mail_address2
	, mail_address3
	, internal_notes
	, timezone_default
	, timezone_enforced
	, is_validated_timezone
	, is_validated_importantdates
	, is_validated_phones
	, is_validated_urls
	, is_validated_notices
	, is_validated_locations
	, is_published
	, 'N'
	, _param_user_id
FROM
	public.jurisdiction
WHERE
	id = _param_jurisdiction_id
RETURNING
	id INTO curr_wip_jurisdiction_id;
INSERT INTO public.wip_jurisdiction_url (wip_jurisdiction_id , urltype_id , url , name , description)
SELECT
	curr_wip_jurisdiction_id
	, urltype_id
	, url
	, name
	, description
FROM
	public.jurisdiction_url
WHERE
	jurisdiction_id = _param_jurisdiction_id;
INSERT INTO public.wip_jurisdiction_phone (wip_jurisdiction_id , phonenumbertype_id , phone_number , description , sort_order)
SELECT
	curr_wip_jurisdiction_id
	, phonenumbertype_id
	, phone_number
	, description
	, sort_order
FROM
	public.jurisdiction_phone
WHERE
	jurisdiction_id = _param_jurisdiction_id;
INSERT INTO public.wip_jurisdiction_notice (wip_jurisdiction_id , date_posted , severity , message)
SELECT
	curr_wip_jurisdiction_id
	, date_posted
	, severity
	, message
FROM
	public.jurisdiction_notice
WHERE
	jurisdiction_id = _param_jurisdiction_id;
INSERT INTO public.wip_jurisdiction_importantdate (wip_jurisdiction_id , importantdatetype_id , note , begin_date , begin_time , end_date , end_time)
SELECT
	curr_wip_jurisdiction_id
	, importantdatetype_id
	, note
	, begin_date
	, begin_time
	, end_date
	, end_time
FROM
	public.jurisdiction_importantdate
WHERE
	jurisdiction_id = _param_jurisdiction_id;
INSERT INTO public.wip_jurisdiction_infotab (wip_jurisdiction_id , sort_order , caption , markdown , html , TYPE)
SELECT
	curr_wip_jurisdiction_id
	, sort_order
	, caption
	, markdown
	, html
	, TYPE
FROM
	public.jurisdiction_infotab
WHERE
	jurisdiction_id = _param_jurisdiction_id;
INSERT INTO public.wip_jurisdiction_news (wip_jurisdiction_id , date_posted , caption , url , summary)
SELECT
	curr_wip_jurisdiction_id
	, date_posted
	, caption
	, url
	, summary
FROM
	public.jurisdiction_news
WHERE
	jurisdiction_id = _param_jurisdiction_id;
	FOR r IN (
		SELECT
			*
		FROM
			public.location
		WHERE
			jurisdiction_id = _param_jurisdiction_id)
		LOOP
			INSERT INTO public.wip_location (wip_jurisdiction_id , facilitytype_id , name , info_public , timezone , address1 , address2 , address3 , city , state , zip , contact_name , contact_email , contact_fax , contact_phone , is_early_dropoff_location , is_early_voting_location , is_elections_office , is_polling_location , is_drop_box , is_handicap_accessible , is_staffed_location , schedule_type , schedule_description , tempstring , continuous_open_date , continuous_open_time , continuous_close_date , continuous_close_time , is_outdoors , is_driveup , rules , is_validated_name , is_validated_wayfinding , is_validated_timezone , is_validated_phones , is_validated_email , is_validated_hours , is_validated_rules , is_validated_useflags , is_validated_displaynotes , display_note , internal_note , geom_latitude , geom_longitude , geom_data_source)
			SELECT
				curr_wip_jurisdiction_id
				, r.facilitytype_id
				, r.name
				, r.info_public
				, r.timezone
				, r.address1
				, r.address2
				, r.address3
				, r.city
				, r.state
				, r.zip
				, r.contact_name
				, r.contact_email
				, r.contact_fax
				, r.contact_phone
				, r.is_early_dropoff_location
				, r.is_early_voting_location
				, r.is_elections_office
				, r.is_polling_location
				, r.is_drop_box
				, r.is_handicap_accessible
				, r.is_staffed_location
				, r.schedule_type
				, r.schedule_description
				, r.tempstring
				, r.continuous_open_date
				, r.continuous_open_time
				, r.continuous_close_date
				, r.continuous_close_time
				, r.is_outdoors
				, r.is_driveup
				, r.rules
				, r.is_validated_name
				, r.is_validated_wayfinding
				, r.is_validated_timezone
				, r.is_validated_phones
				, r.is_validated_email
				, r.is_validated_hours
				, r.is_validated_rules
				, r.is_validated_useflags
				, r.is_validated_displaynotes
				, r.display_note
				, r.internal_note
				, r.geom_latitude
				, r.geom_longitude
				, r.geom_data_source
			RETURNING
				id INTO curr_wip_location_id;
			INSERT INTO public.wip_location_hours (wip_location_id , begin_date , end_date , open_time , close_time , note , use_monday , use_tuesday , use_wednesday , use_thursday , use_friday , use_saturday , use_sunday)
			SELECT
				curr_wip_location_id
				, begin_date
				, end_date
				, open_time
				, close_time
				, note
				, use_monday
				, use_tuesday
				, use_wednesday
				, use_thursday
				, use_friday
				, use_saturday
				, use_sunday
			FROM
				public.location_hours
			WHERE
				location_id = r.id;
		END LOOP;
	_out_wip_jurisdiction_id := curr_wip_jurisdiction_id;
END;
$$;

CREATE VIEW public.user_jurisdiction_with_currwip AS
SELECT
	uj.user_id
	, uj.jurisdiction_id
	, s.name state_name
	, j.name jurisdiction_name
	, max(wj.id) wip_jurisdiction_id
FROM
	public.user_jurisdiction uj
	INNER JOIN public.user u ON uj.user_id = u.id
	INNER JOIN public.jurisdiction j ON uj.jurisdiction_id = j.id
	INNER JOIN public.state s ON j.state_id = s.id
	LEFT JOIN public.wip_jurisdiction wj ON j.id = wj.jurisdiction_id
		AND u.id = wj.editor_user_id
		AND ((wj.edit_basis_wip_jurisdiction_id IS NULL
				AND j.wip_jurisdiction_id IS NULL)
			OR (wj.edit_basis_wip_jurisdiction_id IS NOT NULL
				AND j.wip_jurisdiction_id IS NOT NULL
				AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id))
WHERE
	uj.status = 'editor'
GROUP BY
	uj.user_id
	, uj.jurisdiction_id
	, s.name
	, j.name;

CREATE VIEW public.jurisdictions_with_currwip AS
SELECT
	j.id juridiction_id
	, s.name state_name
	, j.name jurisdiction_name
	, u.id editor_user_id
	, max(wj.id) wip_jurisdiction_id
FROM
	public.jurisdiction j
	INNER JOIN public.state s ON j.state_id = s.id
	LEFT JOIN public.wip_jurisdiction wj ON j.id = wj.jurisdiction_id
		AND ((wj.edit_basis_wip_jurisdiction_id IS NULL
				AND j.wip_jurisdiction_id IS NULL)
			OR (wj.edit_basis_wip_jurisdiction_id IS NOT NULL
				AND j.wip_jurisdiction_id IS NOT NULL
				AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id))
	LEFT JOIN public.user u ON wj.editor_user_id = u.id
GROUP BY
	s.name
	, j.name
	, j.id
	, u.id
ORDER BY
	s.name
	, j.name
	, u.id;

CREATE VIEW public.wip_jurisdictions_needing_review AS
SELECT
	j.id juridiction_id
	, s.name state_name
	, j.name jurisdiction_name
	, u.id editor_user_id
	, wj.id wip_jurisdiction_id
FROM
	public.jurisdiction j
	INNER JOIN public.state s ON j.state_id = s.id
	INNER JOIN public.wip_jurisdiction wj ON j.id = wj.jurisdiction_id
		AND ((wj.edit_basis_wip_jurisdiction_id IS NULL
				AND j.wip_jurisdiction_id IS NULL)
			OR (wj.edit_basis_wip_jurisdiction_id IS NOT NULL
				AND j.wip_jurisdiction_id IS NOT NULL
				AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id))
	LEFT JOIN public.user u ON wj.editor_user_id = u.id
WHERE
	wj.is_released IS TRUE
ORDER BY
	s.name
	, j.name
	, u.id;

CREATE OR REPLACE FUNCTION wip_jurisdiction_publish (_param_wip_jurisdiction_id IN int , _param_publisher_user_id IN int , _out_jurisdiction_id OUT int)
LANGUAGE plpgsql
AS $$
DECLARE
	_cur_jurisdiction_id int;
	_cur_location_id int;
	r record;
BEGIN
	IF NOT EXISTS (
		SELECT
			id
		FROM
			public.user
		WHERE
			id = _param_publisher_user_id
			AND ROLE = 'admin') THEN
	RAISE EXCEPTION 'user.id= % not found or not an admin' , _param_publisher_user_id
		USING HINT = 'Function can only be called with a valid user.id that is an admin';
END IF;
	IF NOT EXISTS (
		SELECT
			id
		FROM
			public.wip_jurisdiction
		WHERE
			id = _param_wip_jurisdiction_id
			AND is_released IS TRUE) THEN
	RAISE EXCEPTION 'jurisdiction.id= % not correct' , _param_wip_jurisdiction_id
	USING HINT = 'Function can only be called with a valid wip_jurisdiction.id where wip_jurisdiction.is_released is true';
END IF;
	IF NOT EXISTS (
		SELECT
			wj.jurisdiction_id
		FROM
			public.wip_jurisdiction wj
			INNER JOIN public.jurisdiction j ON wj.jurisdiction_id = j.id
				AND ((wj.edit_basis_wip_jurisdiction_id IS NULL
						AND j.wip_jurisdiction_id IS NULL)
					OR (wj.edit_basis_wip_jurisdiction_id IS NOT NULL
						AND j.wip_jurisdiction_id IS NOT NULL
						AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id))
		WHERE
			wj.id = _param_wip_jurisdiction_id
			AND wj.is_released IS TRUE) THEN
	RAISE EXCEPTION 'Conflict between editing-basis of wip_jurisdiction.id= % and current publishing-basis of jurisdiction.' , _param_wip_jurisdiction_id
	USING HINT = 'This means that a different wip_jurisdiction has been published to this jurisdiction more recently than editing began on this wip_jurisdiction.';
END IF;
	SELECT
		wj.jurisdiction_id INTO _cur_jurisdiction_id
	FROM
		public.wip_jurisdiction wj
		INNER JOIN public.jurisdiction j ON wj.jurisdiction_id = j.id
			AND ((wj.edit_basis_wip_jurisdiction_id IS NULL
					AND j.wip_jurisdiction_id IS NULL)
				OR (wj.edit_basis_wip_jurisdiction_id IS NOT NULL
					AND j.wip_jurisdiction_id IS NOT NULL
					AND j.wip_jurisdiction_id = wj.edit_basis_wip_jurisdiction_id))
	WHERE
		wj.id = _param_wip_jurisdiction_id
		AND wj.is_released IS TRUE;
	DELETE FROM public.jurisdiction_importantdate
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	DELETE FROM public.jurisdiction_infotab
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	DELETE FROM public.jurisdiction_news
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	DELETE FROM public.jurisdiction_notice
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	DELETE FROM public.jurisdiction_phone
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	DELETE FROM public.jurisdiction_url
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	DELETE FROM public.location
	WHERE jurisdiction_id = _cur_jurisdiction_id;
	UPDATE
		public.jurisdiction
	SET
		name = t0.name
		, authority_name = t0.authority_name
		, mail_address1 = t0.mail_address1
		, mail_address2 = t0.mail_address2
		, mail_address3 = t0.mail_address3
		, internal_notes = t0.internal_notes
		, wip_jurisdiction_id = t0.id
		, timezone_default = t0.timezone_default
		, timezone_enforced = t0.timezone_enforced
		, is_validated_timezone = t0.is_validated_timezone
		, is_validated_importantdates = t0.is_validated_importantdates
		, is_validated_phones = t0.is_validated_phones
		, is_validated_urls = t0.is_validated_urls
		, is_validated_notices = t0.is_validated_notices
		, is_validated_locations = t0.is_validated_locations
		, is_published = t0.is_published
	FROM (
		SELECT
			wj.*
		FROM
			public.wip_jurisdiction wj
		WHERE
			wj.id = _param_wip_jurisdiction_id
			AND wj.is_released IS TRUE) t0
WHERE
	jurisdiction.id = t0.jurisdiction_id;
INSERT INTO public.jurisdiction_importantdate (jurisdiction_id , importantdatetype_id , note , begin_date , begin_time , end_date , end_time)
SELECT
	_cur_jurisdiction_id
	, importantdatetype_id
	, note
	, begin_date
	, begin_time
	, end_date
	, end_time
FROM
	public.wip_jurisdiction_importantdate
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id
	AND deleted_at IS NULL;
INSERT INTO public.jurisdiction_infotab (jurisdiction_id , sort_order , caption , markdown , html , TYPE)
SELECT
	_cur_jurisdiction_id
	, sort_order
	, caption
	, markdown
	, html
	, TYPE
FROM
	public.wip_jurisdiction_infotab
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id
	AND deleted_at IS NULL;
INSERT INTO public.jurisdiction_news (jurisdiction_id , date_posted , caption , url , summary)
SELECT
	_cur_jurisdiction_id
	, date_posted
	, caption
	, url
	, summary
FROM
	public.wip_jurisdiction_news
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id
	AND deleted_at IS NULL;
INSERT INTO public.jurisdiction_notice (jurisdiction_id , date_posted , severity , message)
SELECT
	_cur_jurisdiction_id
	, date_posted
	, severity
	, message
FROM
	public.wip_jurisdiction_notice
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id
	AND deleted_at IS NULL;
INSERT INTO public.jurisdiction_phone (jurisdiction_id , phonenumbertype_id , phone_number , description , sort_order)
SELECT
	_cur_jurisdiction_id
	, phonenumbertype_id
	, phone_number
	, description
	, sort_order
FROM
	public.wip_jurisdiction_phone
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id
	AND deleted_at IS NULL;
INSERT INTO public.jurisdiction_url (jurisdiction_id , urltype_id , url , name , description)
SELECT
	_cur_jurisdiction_id
	, urltype_id
	, url
	, name
	, description
FROM
	public.wip_jurisdiction_url
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id
	AND deleted_at IS NULL;
	FOR r IN (
		SELECT
			*
		FROM
			public.wip_location
		WHERE
			wip_jurisdiction_id = _param_wip_jurisdiction_id
			AND deleted_at IS NULL)
		LOOP
			INSERT INTO public.location (jurisdiction_id , facilitytype_id , name , info_public , timezone , address1 , address2 , address3 , city , state , zip , contact_name , contact_email , contact_fax , contact_phone , internal_note , geom_latitude , geom_longitude , geom_data_source , geom_data_note , is_early_dropoff_location , is_early_voting_location , is_elections_office , is_polling_location , is_drop_box , is_handicap_accessible , is_staffed_location , schedule_type , schedule_description , tempstring , continuous_open_date , continuous_open_time , continuous_close_date , continuous_close_time , is_outdoors , is_driveup , rules , is_validated_name , is_validated_wayfinding , is_validated_timezone , is_validated_phones , is_validated_email , is_validated_hours , is_validated_rules , is_validated_useflags , is_validated_displaynotes , display_note)
			SELECT
				_cur_jurisdiction_id
				, r.facilitytype_id
				, r.name
				, r.info_public
				, r.timezone
				, r.address1
				, r.address2
				, r.address3
				, r.city
				, r.state
				, r.zip
				, r.contact_name
				, r.contact_email
				, r.contact_fax
				, r.contact_phone
				, r.internal_note
				, r.geom_latitude
				, r.geom_longitude
				, r.geom_data_source
				, r.geom_data_note
				, r.is_early_dropoff_location
				, r.is_early_voting_location
				, r.is_elections_office
				, r.is_polling_location
				, r.is_drop_box
				, r.is_handicap_accessible
				, r.is_staffed_location
				, r.schedule_type
				, r.schedule_description
				, r.tempstring
				, r.continuous_open_date
				, r.continuous_open_time
				, r.continuous_close_date
				, r.continuous_close_time
				, r.is_outdoors
				, r.is_driveup
				, r.rules
				, r.is_validated_name
				, r.is_validated_wayfinding
				, r.is_validated_timezone
				, r.is_validated_phones
				, r.is_validated_email
				, r.is_validated_hours
				, r.is_validated_rules
				, r.is_validated_useflags
				, r.is_validated_displaynotes
				, r.display_note
			RETURNING
				id INTO _cur_location_id;
			INSERT INTO public.location_hours (location_id , begin_date , end_date , open_time , close_time , note , use_monday , use_tuesday , use_wednesday , use_thursday , use_friday , use_saturday , use_sunday)
			SELECT
				_cur_location_id
				, begin_date
				, end_date
				, open_time
				, close_time
				, note
				, use_monday
				, use_tuesday
				, use_wednesday
				, use_thursday
				, use_friday
				, use_saturday
				, use_sunday
			FROM
				public.wip_location_hours
			WHERE
				wip_location_id = r.id
				AND deleted_at IS NULL;
		END LOOP;
	_out_jurisdiction_id := _cur_jurisdiction_id;
END;
$$;

