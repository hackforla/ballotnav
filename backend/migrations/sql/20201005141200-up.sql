DROP VIEW public.jurisdiction_json;

UPDATE
	public.location
SET
	geom_latitude = NULL
	, geom_longitude = NULL
WHERE
	geom_latitude = 'NULL'
	OR geom_longitude = 'NULL';

ALTER TABLE public.location
	ALTER COLUMN geom_latitude SET DATA TYPE NUMERIC USING geom_latitude::numeric ,
	ALTER COLUMN geom_longitude SET DATA TYPE NUMERIC USING geom_longitude::numeric ,
	ADD COLUMN geom_data_note TEXT ,
	ADD CONSTRAINT wip_location_geom_latitude_valck CHECK (geom_latitude >= - 90 AND geom_latitude <= 90) ,
	ADD CONSTRAINT wip_location_geom_longitude_valck CHECK (geom_longitude >= - 180 AND geom_longitude <= 180);

ALTER TABLE public.wip_location
	DROP COLUMN latitude ,
	DROP COLUMN longitude ,
	DROP COLUMN geom_point ,
	ADD COLUMN geom_latitude NUMERIC ,
	ADD COLUMN geom_longitude NUMERIC ,
	ADD COLUMN geom_data_source TEXT ,
	ADD COLUMN geom_data_note TEXT ,
	ADD CONSTRAINT wip_location_geom_latitude_valck CHECK (geom_latitude >= - 90 AND geom_latitude <= 90) ,
	ADD CONSTRAINT wip_location_geom_longitude_valck CHECK (geom_longitude >= - 180 AND geom_longitude <= 180);

