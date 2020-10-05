-- corrects minor logic fault
CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF ((
		SELECT
			s.timezone_enforced
		FROM
			public.state s
			INNER JOIN public.jurisdiction j ON s.id = j.state_id
		WHERE
			j.id = NEW.jurisdiction_id) IS TRUE) THEN
		NEW.timezone_default = (
			SELECT
				s.timezone_default
			FROM
				public.state s
				INNER JOIN public.jurisdiction j ON s.id = j.state_id
			WHERE
				j.id = NEW.jurisdiction_id);
		NEW.timezone_enforced = TRUE;
		NEW.is_validated_timezone = TRUE;
	END IF;
	IF (NEW.timezone_default IS NULL) THEN
		NEW.timezone_default = (
			SELECT
				s.timezone_default
			FROM
				public.state s
				INNER JOIN public.jurisdiction j ON s.id = j.state_id
			WHERE
				j.id = NEW.jurisdiction_id);
		NEW.timezone_enforced = FALSE;
		NEW.is_validated_timezone = FALSE;
	END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

DROP VIEW state_with_jurisdictions_json;

DROP VIEW jurisdiction_json;

DROP VIEW state_json;

DROP VIEW states_json;

DROP VIEW location_dailyhours;

CREATE TYPE public.enum_unified_notice_severity AS ENUM (
	'critical'
	, 'info'
);

CREATE TYPE public.enum_unified_infotab_type AS ENUM (
	'document'
	, 'infotab'
	, 'contactinfo'
	, 'news'
);

ALTER TABLE public.location
	ALTER COLUMN is_staffed_location DROP DEFAULT ,
	ALTER COLUMN is_staffed_location SET DATA TYPE enum_ynu USING is_staffed_location::text::enum_ynu ,
	ALTER COLUMN is_staffed_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_handicap_accessible DROP DEFAULT ,
	ALTER COLUMN is_handicap_accessible SET DATA TYPE enum_ynu USING is_handicap_accessible::text::enum_ynu ,
	ALTER COLUMN is_handicap_accessible SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_early_dropoff_location DROP DEFAULT ,
	ALTER COLUMN is_early_dropoff_location SET DATA TYPE enum_ynu USING is_early_dropoff_location::text::enum_ynu ,
	ALTER COLUMN is_early_dropoff_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_early_voting_location DROP DEFAULT ,
	ALTER COLUMN is_early_voting_location SET DATA TYPE enum_ynu USING is_early_voting_location::text::enum_ynu ,
	ALTER COLUMN is_early_voting_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_elections_office DROP DEFAULT ,
	ALTER COLUMN is_elections_office SET DATA TYPE enum_ynu USING is_elections_office::text::enum_ynu ,
	ALTER COLUMN is_elections_office SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_polling_location DROP DEFAULT ,
	ALTER COLUMN is_polling_location SET DATA TYPE enum_ynu USING is_polling_location::text::enum_ynu ,
	ALTER COLUMN is_polling_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_drop_box DROP DEFAULT ,
	ALTER COLUMN is_drop_box SET DATA TYPE enum_ynu USING is_drop_box::text::enum_ynu ,
	ALTER COLUMN is_drop_box SET DEFAULT 'U'::enum_ynu;

ALTER TABLE public.wip_location
	ALTER COLUMN is_staffed_location DROP DEFAULT ,
	ALTER COLUMN is_staffed_location SET DATA TYPE enum_ynu USING is_staffed_location::text::enum_ynu ,
	ALTER COLUMN is_staffed_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_handicap_accessible DROP DEFAULT ,
	ALTER COLUMN is_handicap_accessible SET DATA TYPE enum_ynu USING is_handicap_accessible::text::enum_ynu ,
	ALTER COLUMN is_handicap_accessible SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_early_dropoff_location DROP DEFAULT ,
	ALTER COLUMN is_early_dropoff_location SET DATA TYPE enum_ynu USING is_early_dropoff_location::text::enum_ynu ,
	ALTER COLUMN is_early_dropoff_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_early_voting_location DROP DEFAULT ,
	ALTER COLUMN is_early_voting_location SET DATA TYPE enum_ynu USING is_early_voting_location::text::enum_ynu ,
	ALTER COLUMN is_early_voting_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_elections_office DROP DEFAULT ,
	ALTER COLUMN is_elections_office SET DATA TYPE enum_ynu USING is_elections_office::text::enum_ynu ,
	ALTER COLUMN is_elections_office SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_polling_location DROP DEFAULT ,
	ALTER COLUMN is_polling_location SET DATA TYPE enum_ynu USING is_polling_location::text::enum_ynu ,
	ALTER COLUMN is_polling_location SET DEFAULT 'U'::enum_ynu ,
	ALTER COLUMN is_drop_box DROP DEFAULT ,
	ALTER COLUMN is_drop_box SET DATA TYPE enum_ynu USING is_drop_box::text::enum_ynu ,
	ALTER COLUMN is_drop_box SET DEFAULT 'U'::enum_ynu;

ALTER TABLE public.state
	ALTER COLUMN is_late_registration_possible DROP DEFAULT ,
	ALTER COLUMN is_late_registration_possible SET DATA TYPE enum_ynu USING is_late_registration_possible::text::enum_ynu ,
	ALTER COLUMN is_late_registration_possible SET DEFAULT 'U'::enum_ynu;

ALTER TABLE public.wip_state
	ALTER COLUMN is_late_registration_possible DROP DEFAULT ,
	ALTER COLUMN is_late_registration_possible SET DATA TYPE enum_ynu USING is_late_registration_possible::text::enum_ynu ,
	ALTER COLUMN is_late_registration_possible SET DEFAULT 'U'::enum_ynu;

ALTER TABLE public.jurisdiction_notice
	ALTER COLUMN severity DROP DEFAULT ,
	ALTER COLUMN severity SET DATA TYPE enum_unified_notice_severity USING severity::text::enum_unified_notice_severity ,
	ALTER COLUMN severity SET DEFAULT 'info'::enum_unified_notice_severity;

ALTER TABLE public.wip_jurisdiction_notice
	ALTER COLUMN severity DROP DEFAULT ,
	ALTER COLUMN severity SET DATA TYPE enum_unified_notice_severity USING severity::text::enum_unified_notice_severity ,
	ALTER COLUMN severity SET DEFAULT 'info'::enum_unified_notice_severity;

ALTER TABLE public.state_notice
	ALTER COLUMN severity DROP DEFAULT ,
	ALTER COLUMN severity SET DATA TYPE enum_unified_notice_severity USING severity::text::enum_unified_notice_severity ,
	ALTER COLUMN severity SET DEFAULT 'info'::enum_unified_notice_severity;

ALTER TABLE public.wip_state_notice
	ALTER COLUMN severity DROP DEFAULT ,
	ALTER COLUMN severity SET DATA TYPE enum_unified_notice_severity USING severity::text::enum_unified_notice_severity ,
	ALTER COLUMN severity SET DEFAULT 'info'::enum_unified_notice_severity;

ALTER TABLE public.state_infotab
	ALTER COLUMN "type" SET DATA TYPE enum_unified_infotab_type USING "type"::text::enum_unified_infotab_type;

ALTER TABLE public.wip_state_infotab
	ALTER COLUMN "type" SET DATA TYPE enum_unified_infotab_type USING "type"::text::enum_unified_infotab_type;

ALTER TABLE public.jurisdiction_infotab
	ALTER COLUMN "type" SET DATA TYPE enum_unified_infotab_type USING "type"::text::enum_unified_infotab_type;

ALTER TABLE public.wip_jurisdiction_infotab
	ALTER COLUMN "type" SET DATA TYPE enum_unified_infotab_type USING "type"::text::enum_unified_infotab_type;

ALTER TABLE public.wip_state
	ALTER COLUMN voter_registration_authority DROP DEFAULT ,
	ALTER COLUMN voter_registration_authority SET DATA TYPE enum_state_voter_registration_authority USING voter_registration_authority::text::enum_state_voter_registration_authority ,
	ALTER COLUMN voter_registration_authority SET DEFAULT 'jurisdiction'::enum_state_voter_registration_authority ,
	ALTER COLUMN state_type DROP DEFAULT ,
	ALTER COLUMN state_type SET DATA TYPE enum_state_state_type USING state_type::text::enum_state_state_type ,
	ALTER COLUMN state_type SET DEFAULT 'State'::enum_state_state_type ,
	ALTER COLUMN jurisdiction_type DROP DEFAULT ,
	ALTER COLUMN jurisdiction_type SET DATA TYPE enum_state_jurisdiction_type USING jurisdiction_type::text::enum_state_jurisdiction_type ,
	ALTER COLUMN jurisdiction_type SET DEFAULT 'County'::enum_state_jurisdiction_type;

ALTER TABLE public.wip_location
	ALTER COLUMN schedule_type SET DATA TYPE enum_location_schedule_type USING schedule_type::text::enum_location_schedule_type;

DROP TYPE public.enum_jurisdiction_infotab_type;

DROP TYPE public.enum_jurisdiction_notice_severity;

DROP TYPE public.enum_location_is_drop_box;

DROP TYPE public.enum_location_is_early_dropoff_location;

DROP TYPE public.enum_location_is_early_voting_location;

DROP TYPE public.enum_location_is_elections_office;

DROP TYPE public.enum_location_is_handicap_accessible;

DROP TYPE public.enum_location_is_polling_location;

DROP TYPE public.enum_location_is_staffed_location;

DROP TYPE public.enum_state_infotab_type;

DROP TYPE public.enum_state_is_late_registration_possible;

DROP TYPE public.enum_state_notice_severity;

DROP TYPE public.enum_wip_jurisdiction_infotab_type;

DROP TYPE public.enum_wip_jurisdiction_notice_severity;

DROP TYPE public.enum_wip_location_is_drop_box;

DROP TYPE public.enum_wip_location_is_early_dropoff_location;

DROP TYPE public.enum_wip_location_is_early_voting_location;

DROP TYPE public.enum_wip_location_is_elections_office;

DROP TYPE public.enum_wip_location_is_handicap_accessible;

DROP TYPE public.enum_wip_location_is_polling_location;

DROP TYPE public.enum_wip_location_is_staffed_location;

DROP TYPE public.enum_wip_location_schedule_type;

DROP TYPE public.enum_wip_state_infotab_type;

DROP TYPE public.enum_wip_state_is_late_registration_possible;

DROP TYPE public.enum_wip_state_jurisdiction_type;

DROP TYPE public.enum_wip_state_notice_severity;

DROP TYPE public.enum_wip_state_state_type;

DROP TYPE public.enum_wip_state_voter_registration_authority;

CREATE OR REPLACE VIEW location_dailyhours AS
SELECT
	lh.id AS location_hours_id
	, lh.location_id
	, to_char(d.date_actual::timestamp with time zone , 'YYYY-MM-DD'::text) AS date_actual
	, to_char(lh.open_time::interval , 'HH24:MI'::text) AS open_time
	, to_char(lh.close_time::interval , 'HH24:MI'::text) AS close_time
	, CASE WHEN l.timezone IS NOT NULL THEN
		to_char(timezone(l.timezone , d.date_actual + lh.open_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SSOF'::text)
	ELSE
		NULL::text
	END AS open_timestamp
	, CASE WHEN l.timezone IS NOT NULL THEN
		to_char(timezone(l.timezone , d.date_actual + lh.close_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SSOF'::text)
	ELSE
		NULL::text
	END AS close_timestamp
	, lh.note
FROM
	location_hours lh
	JOIN LOCATION l ON lh.location_id = l.id
	JOIN calendar d ON d.date_actual >= lh.begin_date
		AND d.date_actual <= lh.end_date
WHERE
	l.timezone IS NOT NULL
	AND ((lh.use_monday IS TRUE
			AND d.day_name = 'Monday')
		OR (lh.use_tuesday IS TRUE
			AND d.day_name = 'Tuesday')
		OR (lh.use_wednesday IS TRUE
			AND d.day_name = 'Wednesday')
		OR (lh.use_thursday IS TRUE
			AND d.day_name = 'Thursday')
		OR (lh.use_friday IS TRUE
			AND d.day_name = 'Friday')
		OR (lh.use_saturday IS TRUE
			AND d.day_name = 'Saturday')
		OR (lh.use_sunday IS TRUE
			AND d.day_name = 'Sunday'))
ORDER BY
	lh.location_id
	, d.date_actual
	, lh.open_time
	, lh.close_time;

CREATE OR REPLACE VIEW public.states_json AS
SELECT
	array_to_json(array_agg(t0.state_json)) AS states_json
FROM (
	SELECT
		json_build_object('id' , s.id , 'abbreviation' , s.abbreviation , 'name' , s.name , 'timezoneDefault' , COALESCE(s.timezone_default , ''::text) , 'authorityName' , COALESCE(s.authority_name , ''::text) , 'jurisdictionType' , COALESCE(s.jurisdiction_type , 'County'::enum_state_jurisdiction_type) , 'isLateRegistrationPossible' , COALESCE(s.is_late_registration_possible , 'U'::enum_ynu) , 'stateType' , COALESCE(s.state_type , 'State'::enum_state_state_type)) AS state_json
	FROM
		state s
	ORDER BY
		s.name) t0;

CREATE OR REPLACE VIEW public.state_json AS
SELECT
	s.id
	, json_build_object('id' , s.id , 'abbreviation' , s.abbreviation , 'name' , s.name , 'authorityName' , COALESCE(s.authority_name , ''::text) , 'jurisdictionType' , COALESCE(s.jurisdiction_type , 'County'::enum_state_jurisdiction_type) , 'isLateRegistrationPossible' , COALESCE(s.is_late_registration_possible , 'U'::enum_ynu) , 'stateType' , COALESCE(s.state_type , 'State'::enum_state_state_type) , 'importantdates' , COALESCE(t_js_impdates.dates_json , '[]'::json) , 'infotabs' , COALESCE(t_js_infotabs.infotabs_json , '[]'::json) , 'news' , COALESCE(t_js_news.news_json , '[]'::json) , 'notices' , COALESCE(t_js_notices.notices_json , '[]'::json) , 'phones' , COALESCE(t_js_phones.tn_json , '[]'::json) , 'urls' , COALESCE(t_js_urls.urls_json , '[]'::json)) AS state_json
FROM
	state s
	LEFT JOIN (
		SELECT
			t0.state_id
			, array_to_json(array_agg(t0.date_json)) AS dates_json
		FROM (
			SELECT
				sd.state_id
				, json_build_object('importantDateTypeId' , dt.id , 'importantDateTypeName' , dt.name , 'dateType' , dt.date_type , 'beginTime' , to_char((sd.begin_date + sd.begin_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SS'::text) , 'endTime' , to_char((sd.end_date + sd.end_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SS'::text) , 'note' , COALESCE(sd.note , ''::text)) AS date_json
			FROM
				state_importantdate sd
				JOIN importantdatetype dt ON sd.importantdatetype_id = dt.id
			ORDER BY
				sd.end_time
				, dt.name) t0
		GROUP BY
			t0.state_id) t_js_impdates ON s.id = t_js_impdates.state_id
	LEFT JOIN (
		SELECT
			t0.state_id
			, array_to_json(array_agg(t0.infotab_json) , TRUE) AS infotabs_json
		FROM (
			SELECT
				si.state_id
				, json_build_object('id' , si.id , 'stateId' , si.state_id , 'sortOrder' , si.sort_order , 'caption' , si.caption , 'html' , si.html , 'type' , si.type) AS infotab_json
			FROM
				state_infotab si) t0
		GROUP BY
			t0.state_id) t_js_infotabs ON s.id = t_js_infotabs.state_id
	LEFT JOIN (
		SELECT
			t0.state_id
			, array_to_json(array_agg(t0.newslink_json) , TRUE) AS news_json
		FROM (
			SELECT
				nl.state_id
				, json_build_object('id' , nl.id , 'datePosted' , to_char(nl.date_posted , 'YYYY-MM-DD HH24:MI:SS'::text) , 'stateId' , nl.state_id , 'caption' , nl.caption , 'url' , nl.url , 'summary' , nl.summary) AS newslink_json
			FROM
				state_news nl
			ORDER BY
				nl.date_posted DESC) t0
		GROUP BY
			t0.state_id) t_js_news ON s.id = t_js_news.state_id
	LEFT JOIN (
		SELECT
			t0.state_id
			, array_to_json(array_agg(t0.notice_json) , TRUE) AS notices_json
		FROM (
			SELECT
				jn.state_id
				, json_build_object('id' , jn.id , 'severity' , jn.severity , 'message' , jn.message , 'datePosted' , to_char(jn.date_posted , 'YYYY-MM-DD HH24:MI:SS'::text)) AS notice_json
			FROM
				state_notice jn
			ORDER BY
				jn.date_posted
				, jn.id DESC) t0
		GROUP BY
			t0.state_id) t_js_notices ON s.id = t_js_notices.state_id
	LEFT JOIN (
		SELECT
			t0.state_id
			, array_to_json(array_agg(t0.tn_json) , TRUE) AS tn_json
		FROM (
			SELECT
				sp.state_id
				, json_build_object('id' , sp.id , 'number' , sp.phone_number , 'description' , COALESCE(sp.description , ''::text) , 'phoneNumberTypeName' , pnt.name , 'sortOrder' , pnt.sort_order * 10 + sp.sort_order) AS tn_json
			FROM
				state_phone sp
				JOIN phonenumbertype pnt ON sp.phonenumbertype_id = pnt.id
			ORDER BY
				(pnt.sort_order * 10 + sp.sort_order)) t0
		GROUP BY
			t0.state_id) t_js_phones ON s.id = t_js_phones.state_id
	LEFT JOIN (
		SELECT
			t0.state_id
			, array_to_json(array_agg(t0.url_json) , TRUE) AS urls_json
		FROM (
			SELECT
				u.state_id
				, json_build_object('id' , u.id , 'urlTypeId' , ut.id , 'urlTypeName' , ut.name , 'isEmail' , ut.is_email , 'url' , CASE WHEN u.url !~~ 'http%'::text
						AND ut.is_email = FALSE THEN
						'https://'::text || u.url
					ELSE
						u.url
					END , 'name' , COALESCE(u.name , ut.name , ''::text) , 'description' , COALESCE(u.description , ''::text)) AS url_json
			FROM
				state_url u
			JOIN urltype ut ON u.urltype_id = ut.id
		ORDER BY
			u.id) t0
	GROUP BY
		t0.state_id) t_js_urls ON s.id = t_js_urls.state_id;

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

CREATE OR REPLACE VIEW public.state_with_jurisdictions_json AS
SELECT
	s.id
	, s.state_json::jsonb || t2.jurisdictions_json::jsonb AS state_json
FROM
	state_json s
	LEFT JOIN (
		SELECT
			t0.id
			, json_build_object('jurisdictions' , array_to_json(array_agg(t0.jurisdiction_json))) AS jurisdictions_json
		FROM (
			SELECT
				j.state_id AS id
				, json_build_object('id' , j.id , 'name' , j.name , 'authorityName' , COALESCE(j.authority_name , ''::text)) AS jurisdiction_json
			FROM
				jurisdiction j
			ORDER BY
				j.name) t0
		GROUP BY
			t0.id) t2 ON s.id = t2.id;

ALTER TABLE public.wip_jurisdiction_importantdate
	DROP CONSTRAINT wip_jurisdiction_importantdate_importantdatetype_id_key ,
	DROP CONSTRAINT wip_jurisdiction_importantdate_wip_jurisdiction_id_key ,
	ADD CONSTRAINT wip_jurisdiction_importantdate_uq1 UNIQUE (wip_jurisdiction_id , importantdatetype_id);

DROP PROCEDURE public.fixup_enforced_timezones ();

CREATE OR REPLACE FUNCTION public.fixup_enforced_timezones ()
	RETURNS boolean
	LANGUAGE 'plpgsql'
	AS $BODY$
BEGIN
	UPDATE
		public.jurisdiction
	SET
		timezone_default = t0.timezone_default
		, timezone_enforced = t0.timezone_enforced
		, is_validated_timezone = TRUE
	FROM (
		SELECT
			j.id
			, s.timezone_enforced
			, s.timezone_default
		FROM
			public.jurisdiction j
			INNER JOIN public.state s ON j.state_id = s.id
		WHERE
			s.timezone_default IS NOT NULL
			AND s.timezone_enforced IS TRUE
			AND (j.timezone_enforced IS NULL
				OR j.timezone_enforced IS FALSE
				OR j.timezone_default IS NULL
				OR j.timezone_default <> s.timezone_default)) t0
WHERE
	jurisdiction.id = t0.id;
	UPDATE
		public.location
	SET
		timezone = t0.timezone_default
		, is_validated_timezone = TRUE
	FROM (
		SELECT
			l.id
			, j.timezone_default
		FROM
			public.location l
			INNER JOIN public.jurisdiction j ON l.jurisdiction_id = j.id
		WHERE
			j.timezone_default IS NOT NULL
			AND j.timezone_enforced IS TRUE
			AND (l.timezone IS NULL
				OR l.timezone <> j.timezone_default)) t0
WHERE
	location.id = t0.id;
	RETURN TRUE;
END;
$BODY$;

DROP PROCEDURE public.generate_calendar (date , integer);

CREATE OR REPLACE FUNCTION public.generate_calendar (from_date date , days integer)
	RETURNS boolean
	LANGUAGE 'plpgsql'
	AS $BODY$
BEGIN
	INSERT INTO calendar
	SELECT
		TO_CHAR(datum , 'yyyymmdd')::int AS date_dim_id
		, datum AS date_actual
		, TRIM(TO_CHAR(datum , 'fmDDth')) AS day_suffix
		, TRIM(TO_CHAR(datum , 'Day')) AS day_name
		, EXTRACT(ISODOW FROM datum) AS day_of_week
		, EXTRACT(DAY FROM datum) AS day_of_month
		, datum - DATE_TRUNC('quarter' , datum)::date + 1 AS day_of_quarter
		, EXTRACT(DOY FROM datum) AS day_of_year
		, TO_CHAR(datum , 'W')::int AS week_of_month
		, EXTRACT(WEEK FROM datum) AS week_of_year
		, trim(EXTRACT(ISOYEAR FROM datum) || TO_CHAR(datum , '"-W"IW-') || EXTRACT(ISODOW FROM datum)) AS week_of_year_iso
		, EXTRACT(MONTH FROM datum) AS month_actual
		, trim(TO_CHAR(datum , 'Month')) AS month_name
		, trim(TO_CHAR(datum , 'Mon')) AS month_name_abbreviated
		, EXTRACT(QUARTER FROM datum) AS quarter_actual
		, CASE WHEN EXTRACT(QUARTER FROM datum) = 1 THEN
			'First'
		WHEN EXTRACT(QUARTER FROM datum) = 2 THEN
			'Second'
		WHEN EXTRACT(QUARTER FROM datum) = 3 THEN
			'Third'
		WHEN EXTRACT(QUARTER FROM datum) = 4 THEN
			'Fourth'
		END AS quarter_name
		, EXTRACT(ISOYEAR FROM datum) AS year_actual
		, datum + (1 - EXTRACT(ISODOW FROM datum))::int AS first_day_of_week
		, datum + (7 - EXTRACT(ISODOW FROM datum))::int AS last_day_of_week
		, datum + (1 - EXTRACT(DAY FROM datum))::int AS first_day_of_month
		, (DATE_TRUNC('MONTH' , datum) + INTERVAL '1 MONTH - 1 day')::date AS last_day_of_month
		, DATE_TRUNC('quarter' , datum)::date AS first_day_of_quarter
		, (DATE_TRUNC('quarter' , datum) + INTERVAL '3 MONTH - 1 day')::date AS last_day_of_quarter
		, TO_DATE(EXTRACT(YEAR FROM datum) || '-01-01' , 'YYYY-MM-DD') AS first_day_of_year
		, TO_DATE(EXTRACT(YEAR FROM datum) || '-12-31' , 'YYYY-MM-DD') AS last_day_of_year
		, TO_CHAR(datum , 'mmyyyy') AS mmyyyy
		, TO_CHAR(datum , 'mmddyyyy') AS mmddyyyy
		, CASE WHEN EXTRACT(ISODOW FROM datum) IN (6 , 7) THEN
			TRUE
		ELSE
			FALSE
		END AS weekend_indr
	FROM (
		SELECT
			from_date + SEQUENCE.DAY AS datum
		FROM
			GENERATE_SERIES(0 , days) AS SEQUENCE (DAY)
		GROUP BY
			SEQUENCE.DAY) DQ
ORDER BY
	1;
	RETURN TRUE;
END;
$BODY$;

