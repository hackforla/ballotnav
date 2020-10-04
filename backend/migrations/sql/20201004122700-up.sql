ALTER TABLE location_hours
	ADD COLUMN use_monday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_tuesday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_wednesday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_thursday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_friday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_saturday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_sunday BOOL NOT NULL DEFAULT FALSE;

ALTER TABLE wip_location_hours
	ADD COLUMN use_monday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_tuesday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_wednesday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_thursday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_friday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_saturday BOOL NOT NULL DEFAULT FALSE ,
	ADD COLUMN use_sunday BOOL NOT NULL DEFAULT FALSE;

CREATE OR REPLACE VIEW location_dailyhours AS
SELECT
	lh.id AS location_hours_id
	, lh.location_id
	, to_char(d.date_actual::timestamp with time zone , 'YYYY-MM-DD'::text) AS date_actual
	, to_char(lh.open_time::interval , 'HH24:MI'::text) AS open_time
	, to_char(lh.close_time::interval , 'HH24:MI'::text) AS close_time
	, CASE WHEN l.timezone IS NOT NULL THEN
		to_char(timezone(l.timezone , d.date_actual + lh.open_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SSOF'::text)
	ELSE
		NULL::text
	END AS open_timestamp
	, CASE WHEN l.timezone IS NOT NULL THEN
		to_char(timezone(l.timezone , d.date_actual + lh.close_time::time WITHOUT time zone) , 'YYYY-MM-DD HH24:MI:SSOF'::text)
	ELSE
		NULL::text
	END AS close_timestamp
	, lh.note
FROM
	location_hours lh
	JOIN LOCATION l ON lh.location_id = l.id
	JOIN calendar d ON d.date_actual >= lh.begin_date
		AND d.date_actual <= lh.end_date
WHERE
	l.timezone IS NOT NULL
	AND ((lh.use_monday IS TRUE
			AND d.day_name = 'Monday')
		OR (lh.use_tuesday IS TRUE
			AND d.day_name = 'Tuesday')
		OR (lh.use_wednesday IS TRUE
			AND d.day_name = 'Wednesday')
		OR (lh.use_thursday IS TRUE
			AND d.day_name = 'Thursday')
		OR (lh.use_friday IS TRUE
			AND d.day_name = 'Friday')
		OR (lh.use_saturday IS TRUE
			AND d.day_name = 'Saturday')
		OR (lh.use_sunday IS TRUE
			AND d.day_name = 'Sunday'))
ORDER BY
	lh.location_id
	, d.date_actual
	, lh.open_time
	, lh.close_time;

UPDATE
	public.calendar
SET
	day_suffix = trim(day_suffix)
	, day_name = trim(day_name)
	, week_of_year_iso = trim(week_of_year_iso)
	, month_name = trim(month_name)
	, month_abbreviation = trim(month_abbreviation);

CREATE OR REPLACE PROCEDURE public.generate_calendar (from_date date , days integer)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	INSERT INTO calendar
	SELECT
		TO_CHAR(datum , 'yyyymmdd')::int AS date_dim_id
		, datum AS date_actual
		, TRIM(TO_CHAR(datum , 'fmDDth')) AS day_suffix
		, TRIM(TO_CHAR(datum , 'Day')) AS day_name
		, EXTRACT(ISODOW FROM datum) AS day_of_week
		, EXTRACT(DAY FROM datum) AS day_of_month
		, datum - DATE_TRUNC('quarter' , datum)::date + 1 AS day_of_quarter
		, EXTRACT(DOY FROM datum) AS day_of_year
		, TO_CHAR(datum , 'W')::int AS week_of_month
		, EXTRACT(WEEK FROM datum) AS week_of_year
		, trim(EXTRACT(ISOYEAR FROM datum) || TO_CHAR(datum , '"-W"IW-') || EXTRACT(ISODOW FROM datum)) AS week_of_year_iso
		, EXTRACT(MONTH FROM datum) AS month_actual
		, trim(TO_CHAR(datum , 'Month')) AS month_name
		, trim(TO_CHAR(datum , 'Mon')) AS month_name_abbreviated
		, EXTRACT(QUARTER FROM datum) AS quarter_actual
		, CASE WHEN EXTRACT(QUARTER FROM datum) = 1 THEN
			'First'
		WHEN EXTRACT(QUARTER FROM datum) = 2 THEN
			'Second'
		WHEN EXTRACT(QUARTER FROM datum) = 3 THEN
			'Third'
		WHEN EXTRACT(QUARTER FROM datum) = 4 THEN
			'Fourth'
		END AS quarter_name
		, EXTRACT(ISOYEAR FROM datum) AS year_actual
		, datum + (1 - EXTRACT(ISODOW FROM datum))::int AS first_day_of_week
		, datum + (7 - EXTRACT(ISODOW FROM datum))::int AS last_day_of_week
		, datum + (1 - EXTRACT(DAY FROM datum))::int AS first_day_of_month
		, (DATE_TRUNC('MONTH' , datum) + INTERVAL '1 MONTH - 1 day')::date AS last_day_of_month
		, DATE_TRUNC('quarter' , datum)::date AS first_day_of_quarter
		, (DATE_TRUNC('quarter' , datum) + INTERVAL '3 MONTH - 1 day')::date AS last_day_of_quarter
		, TO_DATE(EXTRACT(YEAR FROM datum) || '-01-01' , 'YYYY-MM-DD') AS first_day_of_year
		, TO_DATE(EXTRACT(YEAR FROM datum) || '-12-31' , 'YYYY-MM-DD') AS last_day_of_year
		, TO_CHAR(datum , 'mmyyyy') AS mmyyyy
		, TO_CHAR(datum , 'mmddyyyy') AS mmddyyyy
		, CASE WHEN EXTRACT(ISODOW FROM datum) IN (6 , 7) THEN
			TRUE
		ELSE
			FALSE
		END AS weekend_indr
	FROM (
		SELECT
			from_date + SEQUENCE.DAY AS datum
		FROM
			GENERATE_SERIES(0 , days) AS SEQUENCE (DAY)
		GROUP BY
			SEQUENCE.DAY) DQ
ORDER BY
	1;
	COMMIT;
END;
$BODY$;

