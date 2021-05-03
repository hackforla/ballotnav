CREATE TEMPORARY TABLE downenums(enumname text not null);
INSERT INTO downenums(enumname) VALUES
('enum_importantdatetype_date_type'),
('enum_jurisdiction_infotab_type'),
('enum_jurisdiction_notice_severity'),
('enum_location_is_drop_box'),
('enum_location_is_early_dropoff_location'),
('enum_location_is_early_voting_location'),
('enum_location_is_elections_office'),
('enum_location_is_handicap_accessible'),
('enum_location_is_polling_location'),
('enum_location_is_staffed_location'),
('enum_location_schedule_type'),
('enum_state_infotab_type'),
('enum_state_is_late_registration_possible'),
('enum_state_jurisdiction_type'),
('enum_state_notice_severity'),
('enum_state_state_type'),
('enum_state_voter_registration_authority'),
('enum_user_jurisdiction_status'),
('enum_user_role'),
('enum_user_state_status'),
('enum_wip_jurisdiction_infotab_type'),
('enum_wip_jurisdiction_notice_severity'),
('enum_wip_location_is_drop_box'),
('enum_wip_location_is_early_dropoff_location'),
('enum_wip_location_is_early_voting_location'),
('enum_wip_location_is_elections_office'),
('enum_wip_location_is_handicap_accessible'),
('enum_wip_location_is_polling_location'),
('enum_wip_location_is_staffed_location'),
('enum_wip_location_schedule_type'),
('enum_wip_state_infotab_type'),
('enum_wip_state_is_late_registration_possible'),
('enum_wip_state_jurisdiction_type'),
('enum_wip_state_notice_severity'),
('enum_wip_state_state_type'),
('enum_wip_state_voter_registration_authority');

CREATE TEMPORARY TABLE downtbls(tblname text not null);
INSERT INTO downtbls(tblname) VALUES
('calendar'),
('facilitytype'),
('importantdatetype'),
('jurisdiction'),
('jurisdiction_importantdate'),
('jurisdiction_infotab'),
('jurisdiction_news'),
('jurisdiction_notice'),
('jurisdiction_phone'),
('jurisdiction_publish_log'),
('jurisdiction_url'),
('location'),
('location_hours'),
('phonenumbertype'),
('state'),
('state_importantdate'),
('state_infotab'),
('state_news'),
('state_notice'),
('state_phone'),
('state_publish_log'),
('state_url'),
('urltype'),
('user'),
('user_jurisdiction'),
('user_state'),
('wip_jurisdiction'),
('wip_jurisdiction_importantdate'),
('wip_jurisdiction_infotab'),
('wip_jurisdiction_news'),
('wip_jurisdiction_notice'),
('wip_jurisdiction_phone'),
('wip_jurisdiction_url'),
('wip_location'),
('wip_location_hours'),
('wip_state'),
('wip_state_importantdate'),
('wip_state_infotab'),
('wip_state_news'),
('wip_state_notice'),
('wip_state_phone'),
('wip_state_url');

DROP PROCEDURE generate_calendar(date,int);

DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN  (
		SELECT 'ALTER TABLE "' || pns.nspname || '"."' || pc.relname || '" DROP CONSTRAINT '||pcon.conname||';' stmt
		FROM pg_catalog.pg_constraint pcon, pg_catalog.pg_class pc, pg_catalog.pg_namespace pns
		WHERE pns.oid=pc.relnamespace
		AND pc.oid=pcon.conrelid
		AND pns.nspname ='public'
		AND pcon.contype='f'
		AND pc.relname IN (SELECT DISTINCT tblname FROM downtbls)    
    ) LOOP
        EXECUTE r.stmt;
    END LOOP;
END $$;
				
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN  (
		SELECT 'ALTER TABLE "' || pns.nspname || '"."' || pc.relname || '" DROP CONSTRAINT '||pcon.conname||';' stmt
		FROM pg_catalog.pg_constraint pcon, pg_catalog.pg_class pc, pg_catalog.pg_namespace pns
		WHERE pns.oid=pc.relnamespace
		AND pc.oid=pcon.conrelid
		AND pns.nspname ='public'
		AND pcon.contype<>'f'
		AND pc.relname IN (SELECT DISTINCT tblname FROM downtbls)
    ) LOOP
        EXECUTE r.stmt;
    END LOOP;
END $$;

DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN  (
		SELECT 'DROP TABLE "' || table_schema || '"."' || table_name || '" CASCADE;' stmt
		FROM information_schema.tables
		WHERE table_schema = 'public' AND table_name in (SELECT DISTINCT tblname FROM downtbls)
    ) LOOP
        EXECUTE r.stmt; 
    END LOOP;
END $$;

DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN  (
		SELECT 'DROP TYPE "public"."' || enumname || '";' stmt
		FROM downenums
    ) LOOP
        EXECUTE r.stmt;
    END LOOP;
END $$;
