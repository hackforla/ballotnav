ALTER TABLE public.jurisdiction
	ADD COLUMN is_validated_timezone BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_importantdates BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_phones BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_urls BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_notices BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_locations BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE public.wip_jurisdiction
	ADD COLUMN is_validated_timezone BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_importantdates BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_phones BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_urls BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_notices BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_locations BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE public.location
	ADD COLUMN is_validated_name BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_wayfinding BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_timezone BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_phones BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_email BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_hours BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_rules BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_useflags BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_displaynotes BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN display_note TEXT;

ALTER TABLE public.wip_location
	ADD COLUMN is_validated_name BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_wayfinding BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_timezone BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_phones BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_email BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_hours BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_rules BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_useflags BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN is_validated_displaynotes BOOLEAN NOT NULL DEFAULT FALSE ,
	ADD COLUMN display_note TEXT;

CREATE OR REPLACE FUNCTION public.ftrig_jurisdiction_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
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
	IF ((
		SELECT
			timezone_enforced
		FROM
			state
		WHERE
			id = NEW.state_id) IS TRUE) THEN
		NEW.timezone_default = (
			SELECT
				timezone_default
			FROM
				state
			WHERE
				id = NEW.state_id);
		NEW.timezone_enforced = TRUE;
		NEW.is_validated_timezone = TRUE;
	END IF;
	IF (NEW.timezone_default IS NULL) THEN
		NEW.timezone_default = (
			SELECT
				timezone_default
			FROM
				state
			WHERE
				id = NEW.state_id);
		NEW.timezone_enforced = FALSE;
		NEW.is_validated_timezone = FALSE;
	END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

DROP TRIGGER trig_location_b_u ON public.location;

DROP FUNCTION public.ftrig_location_b_u ();

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
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

CREATE TRIGGER trig_location_b_iu
	BEFORE INSERT OR UPDATE ON public.location
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_location_b_iu ();

CREATE OR REPLACE FUNCTION public.ftrig_wip_jurisdiction_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
	IF ((
		SELECT
			timezone_enforced
		FROM
			state
		WHERE
			id = NEW.state_id) IS TRUE) THEN
		NEW.timezone_default = (
			SELECT
				timezone_default
			FROM
				state
			WHERE
				id = NEW.state_id);
		NEW.timezone_enforced = TRUE;
		NEW.is_validated_timezone = TRUE;
	END IF;
	IF (NEW.timezone_default IS NULL) THEN
		NEW.timezone_default = (
			SELECT
				timezone_default
			FROM
				state
			WHERE
				id = NEW.state_id);
		NEW.timezone_enforced = FALSE;
		NEW.is_validated_timezone = FALSE;
	END IF;
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$BODY$;

DROP TRIGGER trig_wip_location_b_u ON public.wip_location;

DROP FUNCTION public.ftrig_wip_location_b_u ();

CREATE OR REPLACE FUNCTION public.ftrig_wip_location_b_iu ()
	RETURNS TRIGGER
	LANGUAGE 'plpgsql'
	COST 100 VOLATILE NOT LEAKPROOF
	AS $BODY$
BEGIN
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

CREATE TRIGGER trig_wip_location_b_iu
	BEFORE INSERT OR UPDATE ON public.wip_location
	FOR EACH ROW
	EXECUTE PROCEDURE ftrig_wip_location_b_iu ();

CREATE OR REPLACE PROCEDURE public.fixup_enforced_timezones ()
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
	COMMIT;
END;
$BODY$;

