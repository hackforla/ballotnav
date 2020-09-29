ALTER TABLE public.wip_state
	DROP COLUMN fips_code ,
	DROP COLUMN fips_number;

ALTER TABLE public.wip_jurisdiction
	DROP COLUMN fips_category ,
	DROP COLUMN fips_county_code ,
	DROP COLUMN fips_county_number ,
	DROP COLUMN fips_complete_county_code ,
	DROP COLUMN fips_complete_county_number ,
	DROP COLUMN fips_county_sub_code ,
	DROP COLUMN fips_place_code ,
	DROP COLUMN fips_cons_city_code;

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
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

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
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

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
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

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
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION ftrig_facilitytype_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_facilitytype_b_u
	BEFORE UPDATE ON public.facilitytype
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_facilitytype_b_u ();

CREATE OR REPLACE FUNCTION ftrig_importantdatetype_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_importantdatetype_b_u
	BEFORE UPDATE ON public.importantdatetype
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_importantdatetype_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_importantdate_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_importantdate_b_u
	BEFORE UPDATE ON public.jurisdiction_importantdate
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_importantdate_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_infotab_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_infotab_b_u
	BEFORE UPDATE ON public.jurisdiction_infotab
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_infotab_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_news_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_news_b_u
	BEFORE UPDATE ON public.jurisdiction_news
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_news_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_notice_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_notice_b_u
	BEFORE UPDATE ON public.jurisdiction_notice
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_notice_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_phone_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_phone_b_u
	BEFORE UPDATE ON public.jurisdiction_phone
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_phone_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_publish_log_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_publish_log_b_u
	BEFORE UPDATE ON public.jurisdiction_publish_log
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_publish_log_b_u ();

CREATE OR REPLACE FUNCTION ftrig_jurisdiction_url_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_jurisdiction_url_b_u
	BEFORE UPDATE ON public.jurisdiction_url
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_jurisdiction_url_b_u ();

CREATE OR REPLACE FUNCTION ftrig_location_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_location_b_u
	BEFORE UPDATE ON public.location
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_location_b_u ();

CREATE OR REPLACE FUNCTION ftrig_location_hours_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_location_hours_b_u
	BEFORE UPDATE ON public.location_hours
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_location_hours_b_u ();

CREATE OR REPLACE FUNCTION ftrig_phonenumbertype_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_phonenumbertype_b_u
	BEFORE UPDATE ON public.phonenumbertype
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_phonenumbertype_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_importantdate_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_importantdate_b_u
	BEFORE UPDATE ON public.state_importantdate
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_importantdate_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_infotab_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_infotab_b_u
	BEFORE UPDATE ON public.state_infotab
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_infotab_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_news_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_news_b_u
	BEFORE UPDATE ON public.state_news
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_news_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_notice_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_notice_b_u
	BEFORE UPDATE ON public.state_notice
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_notice_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_phone_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_phone_b_u
	BEFORE UPDATE ON public.state_phone
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_phone_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_publish_log_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_publish_log_b_u
	BEFORE UPDATE ON public.state_publish_log
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_publish_log_b_u ();

CREATE OR REPLACE FUNCTION ftrig_state_url_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_state_url_b_u
	BEFORE UPDATE ON public.state_url
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_state_url_b_u ();

CREATE OR REPLACE FUNCTION ftrig_urltype_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_urltype_b_u
	BEFORE UPDATE ON public.urltype
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_urltype_b_u ();

CREATE OR REPLACE FUNCTION ftrig_user_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_user_b_u
	BEFORE UPDATE ON public.user
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_user_b_u ();

CREATE OR REPLACE FUNCTION ftrig_user_jurisdiction_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_user_jurisdiction_b_u
	BEFORE UPDATE ON public.user_jurisdiction
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_user_jurisdiction_b_u ();

CREATE OR REPLACE FUNCTION ftrig_user_state_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_user_state_b_u
	BEFORE UPDATE ON public.user_state
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_user_state_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_importantdate_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_importantdate_b_u
	BEFORE UPDATE ON public.wip_jurisdiction_importantdate
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_importantdate_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_infotab_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_infotab_b_u
	BEFORE UPDATE ON public.wip_jurisdiction_infotab
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_infotab_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_news_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_news_b_u
	BEFORE UPDATE ON public.wip_jurisdiction_news
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_news_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_notice_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_notice_b_u
	BEFORE UPDATE ON public.wip_jurisdiction_notice
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_notice_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_phone_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_phone_b_u
	BEFORE UPDATE ON public.wip_jurisdiction_phone
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_phone_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_jurisdiction_url_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_jurisdiction_url_b_u
	BEFORE UPDATE ON public.wip_jurisdiction_url
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_url_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_location_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_location_b_u
	BEFORE UPDATE ON public.wip_location
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_location_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_location_hours_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_location_hours_b_u
	BEFORE UPDATE ON public.wip_location_hours
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_location_hours_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_importantdate_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_importantdate_b_u
	BEFORE UPDATE ON public.wip_state_importantdate
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_importantdate_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_infotab_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_infotab_b_u
	BEFORE UPDATE ON public.wip_state_infotab
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_infotab_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_news_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_news_b_u
	BEFORE UPDATE ON public.wip_state_news
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_news_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_notice_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_notice_b_u
	BEFORE UPDATE ON public.wip_state_notice
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_notice_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_phone_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_phone_b_u
	BEFORE UPDATE ON public.wip_state_phone
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_phone_b_u ();

CREATE OR REPLACE FUNCTION ftrig_wip_state_url_b_u ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;

CREATE TRIGGER trig_wip_state_url_b_u
	BEFORE UPDATE ON public.wip_state_url
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_state_url_b_u ();

