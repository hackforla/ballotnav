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

