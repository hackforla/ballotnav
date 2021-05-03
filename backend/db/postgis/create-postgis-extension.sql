--- setup the postgis extension
--- confirm that we are logged in as the ballotnav dev user

SELECT
    CURRENT_USER;

--- create the postgis extensions
DROP EXTENSION IF EXISTS postgis CASCADE;

CREATE EXTENSION postgis;

DROP EXTENSION IF EXISTS fuzzystrmatch CASCADE;

CREATE EXTENSION fuzzystrmatch;

DROP EXTENSION IF EXISTS postgis_tiger_geocoder CASCADE;

CREATE EXTENSION postgis_tiger_geocoder;

DROP EXTENSION IF EXISTS postgis_topology CASCADE;

CREATE EXTENSION postgis_topology;

-- list the current ownership of these schema
\dn
--- alter ownership to rds_super user
ALTER SCHEMA tiger OWNER TO rds_superuser;

ALTER SCHEMA tiger_data OWNER TO rds_superuser;

ALTER SCHEMA topology OWNER TO rds_superuser;

-- list the current ownership of these schema
\dn
-- transfer ownership of postgis objects to rds_superuser
--- source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.html#Appendix.PostgreSQL.CommonDBATasks.PostGIS

DROP FUNCTION IF EXISTS exec;

CREATE FUNCTION exec (text)
    RETURNS text
    LANGUAGE plpgsql
    VOLATILE
    AS $f$
BEGIN
    EXECUTE $1;
    RETURN $1;
END;
$f$;

-- run the above function to alter necessary permissions
SELECT
    exec ('ALTER TABLE ' || quote_ident(s.nspname) || '.' || quote_ident(s.relname) || ' OWNER TO rds_superuser;')
FROM (
    SELECT
        nspname,
        relname
    FROM
        pg_class c
        JOIN pg_namespace n ON (c.relnamespace = n.oid)
    WHERE
        nspname IN ('tiger', 'topology')
        AND relkind IN ('r', 'S', 'v')
    ORDER BY
        relkind = 'S') s;

-- test that extensions are valid
SET search_path = public, tiger;

--- test address to LA County Registrar headquarters
SELECT
    na.address,
    na.streetname,
    na.streettypeabbrev,
    na.zip
FROM
    normalize_address ('12400 Imperial Highway, Norwalk, CA 90650') AS na;
