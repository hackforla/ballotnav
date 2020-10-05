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

