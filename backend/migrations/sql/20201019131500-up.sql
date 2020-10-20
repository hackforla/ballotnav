CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction that has ever been published.';
END IF;
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

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_importantdate_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_importantdate_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_infotab_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_infotab_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_news_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_news_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_notice_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_notice_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_phone_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_phone_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_url_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_url_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_location_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = NEW.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	IF ((
		SELECT
			timezone_enforced
		FROM
			wip_jurisdiction
		WHERE
			id = NEW.wip_jurisdiction_id) IS TRUE) THEN
		NEW.timezone = (
			SELECT
				timezone_default
			FROM
				wip_jurisdiction
			WHERE
				id = NEW.wip_jurisdiction_id);
		NEW.is_validated_timezone = TRUE;
	END IF;
	IF (NEW.timezone IS NULL) THEN
		NEW.timezone = (
			SELECT
				timezone_default
			FROM
				wip_jurisdiction
			WHERE
				id = NEW.wip_jurisdiction_id);
		NEW.is_validated_timezone = FALSE;
	END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_location_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log
		WHERE
			wip_jurisdiction_id = OLD.wip_jurisdiction_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_location_hours_b_u ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			jpl.wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log jpl
			INNER JOIN public.wip_location wl ON jpl.wip_jurisdiction_id = wl.wip_jurisdiction_id
		WHERE
			wl.id = NEW.wip_location_id) THEN
	RAISE EXCEPTION 'Cannot update wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.ftrig_wip_location_hours_b_d ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF EXISTS (
		SELECT
			jpl.wip_jurisdiction_id
		FROM
			public.jurisdiction_publish_log jpl
			INNER JOIN public.wip_location wl ON jpl.wip_jurisdiction_id = wl.wip_jurisdiction_id
		WHERE
			wl.id = OLD.wip_location_id) THEN
	RAISE EXCEPTION 'Cannot delete wip_jurisdiction (or dependent tables) that has ever been published.';
END IF;
	RETURN OLD;
END;
$BODY$;

CREATE TRIGGER trig_wip_location_b_d
	BEFORE DELETE ON public.wip_location
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_location_b_d ();

CREATE TRIGGER trig_wip_location_hours_b_d
	BEFORE DELETE ON public.wip_location_hours
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_location_hours_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_b_d
	BEFORE DELETE ON public.wip_jurisdiction
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_phone_b_d
	BEFORE DELETE ON public.wip_jurisdiction_phone
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_phone_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_url_b_d
	BEFORE DELETE ON public.wip_jurisdiction_url
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_url_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_notice_b_d
	BEFORE DELETE ON public.wip_jurisdiction_notice
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_notice_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_news_b_d
	BEFORE DELETE ON public.wip_jurisdiction_news
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_news_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_infotab_b_d
	BEFORE DELETE ON public.wip_jurisdiction_infotab
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_infotab_b_d ();

CREATE TRIGGER trig_wip_jurisdiction_importantdate_b_d
	BEFORE DELETE ON public.wip_jurisdiction_importantdate
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_jurisdiction_importantdate_b_d ();

ALTER TABLE public.wip_jurisdiction_importantdate
	DROP CONSTRAINT wip_jurisdiction_importantdate_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_jurisdiction_importantdate_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_jurisdiction_infotab
	DROP CONSTRAINT wip_jurisdiction_infotab_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_jurisdiction_infotab_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_jurisdiction_news
	DROP CONSTRAINT wip_jurisdiction_news_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_jurisdiction_news_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_jurisdiction_notice
	DROP CONSTRAINT wip_jurisdiction_notice_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_jurisdiction_notice_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_jurisdiction_phone
	DROP CONSTRAINT wip_jurisdiction_phone_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_jurisdiction_phone_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_jurisdiction_url
	DROP CONSTRAINT wip_jurisdiction_url_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_jurisdiction_url_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_location
	DROP CONSTRAINT wip_location_wip_jurisdiction_id_fkey ,
	ADD CONSTRAINT wip_location_wip_jurisdiction_id_fkey FOREIGN KEY (wip_jurisdiction_id) REFERENCES public.wip_jurisdiction (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.wip_location_hours
	DROP CONSTRAINT wip_location_hours_wip_location_id_fkey ,
	ADD CONSTRAINT wip_location_hours_wip_location_id_fkey FOREIGN KEY (wip_location_id) REFERENCES public.wip_location (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION public.ftrig_location_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF ((
		SELECT
			timezone_enforced
		FROM
			jurisdiction
		WHERE
			id = NEW.jurisdiction_id) IS TRUE) THEN
		NEW.timezone = (
			SELECT
				timezone_default
			FROM
				jurisdiction
			WHERE
				id = NEW.jurisdiction_id);
		NEW.is_validated_timezone = TRUE;
	END IF;
	IF (NEW.timezone IS NULL) THEN
		NEW.timezone = (
			SELECT
				timezone_default
			FROM
				jurisdiction
			WHERE
				id = NEW.jurisdiction_id);
		NEW.is_validated_timezone = FALSE;
	END IF;
	IF (NEW.geom_latitude IS NOT NULL AND NEW.geom_longitude IS NOT NULL) THEN
		NEW.geom_point = ST_SetSRID (ST_MakePoint (NEW.geom_longitude , NEW.geom_latitude) , 4326);
	END IF;
	IF (NEW.geom_latitude IS NULL OR NEW.geom_longitude IS NULL) THEN
		NEW.geom_point = NULL;
	END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

