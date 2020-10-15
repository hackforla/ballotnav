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
	INSERT INTO jurisdiction_publish_log (jurisdiction_id , publisher_user_id , wip_jurisdiction_id)
	SELECT
		_cur_jurisdiction_id
		, _param_publisher_user_id
		, _param_wip_jurisdiction_id;
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
	wip_jurisdiction_id = _param_wip_jurisdiction_id;
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
	wip_jurisdiction_id = _param_wip_jurisdiction_id;
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
	wip_jurisdiction_id = _param_wip_jurisdiction_id;
INSERT INTO public.jurisdiction_notice (jurisdiction_id , date_posted , severity , message)
SELECT
	_cur_jurisdiction_id
	, date_posted
	, severity
	, message
FROM
	public.wip_jurisdiction_notice
WHERE
	wip_jurisdiction_id = _param_wip_jurisdiction_id;
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
	wip_jurisdiction_id = _param_wip_jurisdiction_id;
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
	wip_jurisdiction_id = _param_wip_jurisdiction_id;
	FOR r IN (
		SELECT
			*
		FROM
			public.wip_location
		WHERE
			wip_jurisdiction_id = _param_wip_jurisdiction_id)
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
				wip_location_id = r.id;
		END LOOP;
	_out_jurisdiction_id := _cur_jurisdiction_id;
END;
$$;

