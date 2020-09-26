ALTER TABLE public.wip_location
	ADD COLUMN tempstring text ,
	ADD COLUMN continuous_open_date date ,
	ADD COLUMN continuous_open_time text ,
	ADD COLUMN continuous_close_date date ,
	ADD COLUMN continuous_close_time text ,
	DROP COLUMN continuous_open ,
	DROP COLUMN continuous_close ,
	ADD CONSTRAINT wip_location_continuous_open_time_check CHECK (continuous_open_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT wip_location_continuous_close_time_check CHECK (continuous_close_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

ALTER TABLE public.location
	ADD COLUMN tempstring text ,
	ADD COLUMN continuous_open_date date ,
	ADD COLUMN continuous_open_time text ,
	ADD COLUMN continuous_close_date date ,
	ADD COLUMN continuous_close_time text ,
	ADD CONSTRAINT location_continuous_open_time_check CHECK (continuous_open_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT location_continuous_close_time_check CHECK (continuous_close_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

UPDATE
	public.location
SET
	continuous_open_date = continuous_open::date
	, continuous_open_time = to_char(continuous_open::time , 'HH24:MI'::text)
	, continuous_close_date = continuous_close::date
	, continuous_close_time = to_char(continuous_close::time , 'HH24:MI'::text)
WHERE
	continuous_open IS NOT NULL
	AND continuous_close IS NOT NULL;

ALTER TABLE public.location
	DROP COLUMN continuous_open ,
	DROP COLUMN continuous_close;

ALTER TABLE public.location_hours
	ADD CONSTRAINT location_hours_open_time_check CHECK (open_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT location_hours_close_time_check CHECK (close_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

ALTER TABLE public.wip_location_hours
	ADD CONSTRAINT wip_location_hours_open_time_check CHECK (open_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT wip_location_hours_close_time_check CHECK (close_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

ALTER TABLE public.jurisdiction
	ADD COLUMN timezone_default text ,
	ADD COLUMN timezone_enforced boolean NOT NULL DEFAULT FALSE ,
	ADD CONSTRAINT jurisdiction_fips_county_code_check CHECK (fips_county_code ~ '^[0-9]*$') ,
	ADD CONSTRAINT jurisdiction_fips_complete_county_code_check CHECK (fips_complete_county_code ~ '^[0-9]*$') ,
	ADD CONSTRAINT jurisdiction_fips_county_sub_code_check CHECK (fips_county_sub_code ~ '^[0-9]*$') ,
	ADD CONSTRAINT jurisdiction_fips_place_code_check CHECK (fips_place_code ~ '^[0-9]*$') ,
	ADD CONSTRAINT jurisdiction_fips_cons_city_code_check CHECK (fips_cons_city_code ~ '^[0-9]*$');

ALTER TABLE public.wip_jurisdiction
	ADD COLUMN timezone_default text ,
	ADD COLUMN timezone_enforced boolean NOT NULL DEFAULT FALSE;

ALTER TABLE public.state
	ADD COLUMN timezone_enforced boolean DEFAULT FALSE ,
	ADD CONSTRAINT state_fips_code_check CHECK (fips_code ~ '^[0-9]*$');

ALTER TABLE public.wip_state
	ADD COLUMN timezone_enforced boolean DEFAULT FALSE;

ALTER TABLE public.wip_state_importantdate
	DROP COLUMN begin_time ,
	DROP COLUMN end_time;

ALTER TABLE public.wip_state_importantdate
	ADD COLUMN begin_date date ,
	ADD COLUMN begin_time text ,
	ADD COLUMN end_date date NOT NULL ,
	ADD COLUMN end_time text NOT NULL ,
	ADD CONSTRAINT wip_state_importantdate_end_time_check CHECK (end_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT wip_state_importantdate_begin_time_check CHECK (begin_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

ALTER TABLE public.wip_jurisdiction_importantdate
	DROP COLUMN begin_time ,
	DROP COLUMN end_time;

ALTER TABLE public.wip_jurisdiction_importantdate
	ADD COLUMN begin_date date ,
	ADD COLUMN begin_time text ,
	ADD COLUMN end_date date NOT NULL ,
	ADD COLUMN end_time text NOT NULL ,
	ADD CONSTRAINT wip_jurisdiction_importantdate_end_time_check CHECK (end_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT wip_jurisdiction_importantdate_begin_time_check CHECK (begin_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

ALTER TABLE public.state_importantdate
	ADD COLUMN out_begin_time timestamp WITH time zone ,
	ADD COLUMN out_end_time timestamp WITH time zone;

UPDATE
	public.state_importantdate
SET
	out_begin_time = begin_time
	, out_end_time = end_time;

ALTER TABLE public.state_importantdate
	DROP COLUMN begin_time ,
	DROP COLUMN end_time;

ALTER TABLE public.state_importantdate
	ADD COLUMN begin_date date ,
	ADD COLUMN begin_time text ,
	ADD COLUMN end_date date ,
	ADD COLUMN end_time text;

UPDATE
	public.state_importantdate
SET
	begin_date = out_begin_time
	, begin_time = to_char(out_begin_time , 'HH24:MI'::text)
	, end_date = out_end_time
	, end_time = to_char(out_end_time , 'HH24:MI'::text);

ALTER TABLE public.state_importantdate
	DROP COLUMN out_begin_time ,
	DROP COLUMN out_end_time;

ALTER TABLE public.state_importantdate
	ALTER COLUMN end_time SET NOT NULL ,
	ALTER COLUMN end_date SET NOT NULL ,
	ADD CONSTRAINT state_importantdate_end_time_check CHECK (end_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT state_importantdate_begin_time_check CHECK (begin_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

ALTER TABLE public.jurisdiction_importantdate
	ADD COLUMN out_begin_time timestamp WITH time zone ,
	ADD COLUMN out_end_time timestamp WITH time zone;

UPDATE
	public.jurisdiction_importantdate
SET
	out_begin_time = begin_time
	, out_end_time = end_time;

ALTER TABLE public.jurisdiction_importantdate
	DROP COLUMN begin_time ,
	DROP COLUMN end_time;

ALTER TABLE public.jurisdiction_importantdate
	ADD COLUMN begin_date date ,
	ADD COLUMN begin_time text ,
	ADD COLUMN end_date date ,
	ADD COLUMN end_time text;

UPDATE
	public.jurisdiction_importantdate
SET
	begin_date = out_begin_time
	, begin_time = to_char(out_begin_time , 'HH24:MI'::text)
	, end_date = out_end_time
	, end_time = to_char(out_end_time , 'HH24:MI'::text);

ALTER TABLE public.jurisdiction_importantdate
	DROP COLUMN out_begin_time ,
	DROP COLUMN out_end_time;

ALTER TABLE public.jurisdiction_importantdate
	ALTER COLUMN end_time SET NOT NULL ,
	ALTER COLUMN end_date SET NOT NULL ,
	ADD CONSTRAINT jurisdiction_importantdate_end_time_check CHECK (end_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)') ,
	ADD CONSTRAINT jurisdiction_importantdate_begin_time_check CHECK (begin_time ~ '(^(2[0-3]|[01][0-9]|[0-9]):?([0-5][0-9]):?([0-5][0-9])?$)|(^(1[012]|0[1-9]|[1-9]):[0-5][0-9] [AaPp][Mm]$)');

DO $$
DECLARE
	r RECORD;
BEGIN
	FOR r IN (
		SELECT
			'ALTER TABLE ONLY "' || table_schema || '"."' || table_name || '" ALTER COLUMN "' || column_name || '" SET DEFAULT NOW();' stmt
		FROM
			information_schema.columns
		WHERE
			column_name IN ('created_at' , 'updated_at')
			AND column_default IS NULL
			AND is_nullable = 'NO'
		ORDER BY
			table_name
			, column_name)
		LOOP
			EXECUTE r.stmt;
		END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION ftrig_state_b_iu ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	IF (NEW.fips_code IS NOT NULL AND NEW.fips_code <> '') THEN
		NEW.fips_number = NEW.fips_code::integer;
	ELSE
		NEW.fips_code = NULL;
		NEW.fips_number = NULL;
	END IF;
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_b_iu
	BEFORE INSERT OR UPDATE ON public.state
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_b_iu ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_b_iu ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	IF (NEW.fips_code IS NOT NULL AND NEW.fips_code <> '') THEN
		NEW.fips_number = NEW.fips_code::integer;
	ELSE
		NEW.fips_code = NULL;
		NEW.fips_number = NULL;
	END IF;
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_b_iu
	BEFORE INSERT OR UPDATE ON public.wip_state
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_b_iu ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_b_iu ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	IF (NEW.fips_county_code IS NOT NULL AND NEW.fips_county_code <> '') THEN
		NEW.fips_county_number = NEW.fips_county_code::integer;
	ELSE
		NEW.fips_county_code = NULL;
		NEW.fips_county_number = NULL;
	END IF;
	IF (NEW.fips_complete_county_code IS NOT NULL AND NEW.fips_complete_county_code <> '') THEN
		NEW.fips_complete_county_number = NEW.fips_complete_county_code::integer;
	ELSE
		NEW.fips_complete_county_code = NULL;
		NEW.fips_complete_county_number = NULL;
	END IF;
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_b_iu
	BEFORE INSERT OR UPDATE ON public.jurisdiction
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_b_iu ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_b_iu ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	IF (NEW.fips_county_code IS NOT NULL AND NEW.fips_county_code <> '') THEN
		NEW.fips_county_number = NEW.fips_county_code::integer;
	ELSE
		NEW.fips_county_code = NULL;
		NEW.fips_county_number = NULL;
	END IF;
	IF (NEW.fips_complete_county_code IS NOT NULL AND NEW.fips_complete_county_code <> '') THEN
		NEW.fips_complete_county_number = NEW.fips_complete_county_code::integer;
	ELSE
		NEW.fips_complete_county_code = NULL;
		NEW.fips_complete_county_number = NULL;
	END IF;
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_b_iu
	BEFORE INSERT OR UPDATE ON public.wip_jurisdiction
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_b_iu ();

-- DROP VIEW public.location_dailyhours;
CREATE OR REPLACE VIEW public.location_dailyhours AS
SELECT
	lh.id AS location_hours_id
	, lh.location_id
	, to_char(d.date_actual::timestamp WITH time zone , 'YYYY-MM-DD'::text) AS date_actual
	, to_char(lh.open_time::interval , 'HH24:MI'::text) AS open_time
	, to_char(lh.close_time::interval , 'HH24:MI'::text) AS close_time
	, CASE WHEN (l.timezone IS NOT NULL) THEN
		to_char(timezone(l.timezone , (d.date_actual::date + lh.open_time::time WITHOUT time zone)) , 'YYYY-MM-DD HH24:MI:SSOF')
	ELSE
		NULL
	END AS open_timestamp
	, CASE WHEN (l.timezone IS NOT NULL) THEN
		to_char(timezone(l.timezone , (d.date_actual::date + lh.close_time::time WITHOUT time zone)) , 'YYYY-MM-DD HH24:MI:SSOF')
	ELSE
		NULL
	END AS close_timestamp
	, lh.note
FROM
	location_hours lh
	JOIN LOCATION l ON lh.location_id = l.id
	JOIN calendar d ON d.date_actual >= lh.begin_date
		AND d.date_actual <= lh.end_date
WHERE
	l.timezone IS NOT NULL
ORDER BY
	lh.location_id
	, d.date_actual
	, lh.open_time
	, lh.close_time;

-- DROP VIEW public.jurisdiction_json;
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

-- DROP VIEW public.state_json;
CREATE OR REPLACE VIEW public.state_json AS
SELECT
	s.id
	, json_build_object('id' , s.id , 'abbreviation' , s.abbreviation , 'name' , s.name , 'authorityName' , COALESCE(s.authority_name , ''::text) , 'jurisdictionType' , COALESCE(s.jurisdiction_type , 'County'::enum_state_jurisdiction_type) , 'isLateRegistrationPossible' , COALESCE(s.is_late_registration_possible , 'U'::enum_state_is_late_registration_possible) , 'stateType' , COALESCE(s.state_type , 'State'::enum_state_state_type) , 'importantdates' , COALESCE(t_js_impdates.dates_json , '[]'::json) , 'infotabs' , COALESCE(t_js_infotabs.infotabs_json , '[]'::json) , 'news' , COALESCE(t_js_news.news_json , '[]'::json) , 'notices' , COALESCE(t_js_notices.notices_json , '[]'::json) , 'phones' , COALESCE(t_js_phones.tn_json , '[]'::json) , 'urls' , COALESCE(t_js_urls.urls_json , '[]'::json)) AS state_json
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

-- DROP VIEW public.state_with_jurisdictions_json;
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

-- DROP VIEW public.states_json;
CREATE OR REPLACE VIEW public.states_json AS
SELECT
	array_to_json(array_agg(t0.state_json)) AS states_json
FROM (
	SELECT
		json_build_object('id' , s.id , 'abbreviation' , s.abbreviation , 'name' , s.name , 'timezoneDefault' , COALESCE(s.timezone_default , ''::text) , 'authorityName' , COALESCE(s.authority_name , ''::text) , 'jurisdictionType' , COALESCE(s.jurisdiction_type , 'County'::enum_state_jurisdiction_type) , 'isLateRegistrationPossible' , COALESCE(s.is_late_registration_possible , 'U'::enum_state_is_late_registration_possible) , 'stateType' , COALESCE(s.state_type , 'State'::enum_state_state_type)) AS state_json
	FROM
		state s
	ORDER BY
		s.name) t0;

