ALTER TABLE public.gis_shapes
	ADD COLUMN jurisdiction_id integer ,
	ADD COLUMN mcd_fips TEXT ,
	ADD COLUMN mcd_name TEXT ,
	ADD COLUMN ctv TEXT ,
	ADD COLUMN doa TEXT ,
	ADD COLUMN dor TEXT ,
	ADD COLUMN dot TEXT ,
	ADD COLUMN fips6 TEXT ,
	ADD COLUMN fips5 TEXT ,
	ADD COLUMN county_fips TEXT ,
	ADD COLUMN county_name TEXT ,
	ADD COLUMN county_id TEXT ,
	ADD COLUMN town_name TEXT ,
	ADD COLUMN town_id TEXT ,
	ADD COLUMN district_id TEXT ,
	ADD COLUMN district_type TEXT ,
	ADD COLUMN precinct_name TEXT ,
	ADD COLUMN precinct_id TEXT ,
	ADD COLUMN ward TEXT ,
	ADD COLUMN fips_code TEXT ,
	ADD CONSTRAINT gis_shapes_jurisdiction_id_fkey FOREIGN KEY (jurisdiction_id) REFERENCES public.jurisdiction (id) ON UPDATE CASCADE ON DELETE SET NULL;

UPDATE
	public.gis_shapes
SET
	jurisdiction_id = t0.jurisdiction_id
FROM (
	SELECT
		gs.id gis_shapes_id
		, j.id jurisdiction_id
	FROM
		gis_shapes gs
		INNER JOIN jurisdiction j ON gs.countyfp = j.fips_county_code
			AND j.fips_category = 'county'
		INNER JOIN state s ON gs.statefp = s.fips_code
			AND j.state_id = s.id
	WHERE
		gs.dataset = 'cb_us_county'
	ORDER BY
		s.name
		, j.name) t0
WHERE
	gis_shapes.id = t0.gis_shapes_id;

CREATE OR REPLACE FUNCTION jurisdictions_from_lonlatstring (_param_lon_lat_str text)
	RETURNS TABLE (
		state_id integer
		, state_name text
		, jurisdiction_id integer
		, jurisdiction_name text
		, is_eaj boolean
		, is_eaj_exclusive boolean
		, is_published boolean
	)
	AS $$
	SELECT
		s.id state_id
		, s.name state_name
		, j.id jurisdiction_id
		, j.name jurisdiction_name
		, j.is_eaj
		, j.is_eaj_exclusive
		, j.is_published
	FROM
		gis_shapes gs
		INNER JOIN jurisdiction j ON gs.jurisdiction_id = j.id
		INNER JOIN state s ON j.state_id = s.id
	WHERE
		ST_Contains (gs.geo , ST_PointFromText ('POINT(' || _param_lon_lat_str || ')' , 4326))
		AND gs.jurisdiction_id IS NOT NULL
		AND j.is_eaj IS TRUE
$$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION jurisdictions_from_zipcode (_param_zipcode_str text)
	RETURNS TABLE (
		zipcode text
		, state_id integer
		, state_name text
		, jurisdiction_id integer
		, jurisdiction_name text
		, is_eaj boolean
		, is_eaj_exclusive boolean
		, is_published boolean
	)
	AS $$
	SELECT
		gsz.zcta5ce10 zipcode
		, s.id state_id
		, s.name state_name
		, j.id jurisdiction_id
		, j.name jurisdiction_name
		, j.is_eaj
		, j.is_eaj_exclusive
		, j.is_published
	FROM
		gis_shapes gsz
		INNER JOIN gis_shapes gs ON ST_Intersects (gs.geo , gsz.geo)
			AND gs.jurisdiction_id IS NOT NULL
		INNER JOIN jurisdiction j ON gs.jurisdiction_id = j.id
		INNER JOIN state s ON j.state_id = s.id
	WHERE
		gsz.dataset = 'cb_zcta510'
		AND gsz.zcta5ce10 = _param_zipcode_str
		AND j.is_eaj IS TRUE
$$
LANGUAGE SQL;

