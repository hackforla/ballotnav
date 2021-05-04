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

CREATE TABLE ref_dayofweekindex (
	day_index integer NOT NULL
	, day_name text NOT NULL
	, day_bit bit(7) NOT NULL
	, CONSTRAINT ref_dayofweekindex_pkey PRIMARY KEY (day_index)
);

INSERT INTO ref_dayofweekindex (day_index , day_name , day_bit)
SELECT
	1 day_index
	, 'Monday' day_name
	, '0000001'::bit(7) day_bit
UNION ALL
SELECT
	2
	, 'Tuesday'
	, '0000010'::bit(7)
UNION ALL
SELECT
	3
	, 'Wednesday'
	, '0000100'::bit(7)
UNION ALL
SELECT
	4
	, 'Thursday'
	, '0001000'::bit(7)
UNION ALL
SELECT
	5
	, 'Friday'
	, '0010000'::bit(7)
UNION ALL
SELECT
	6
	, 'Saturday'
	, '0100000'::bit(7)
UNION ALL
SELECT
	7
	, 'Sunday'
	, '1000000'::bit(7);

CREATE FUNCTION ingress_hoursstatementtotable (param_officehoursstring text)
	RETURNS TABLE (
		begin_hour time without time zone
		, end_hour time without time zone
		, use_sunday boolean
		, use_monday boolean
		, use_tuesday boolean
		, use_wednesday boolean
		, use_thursday boolean
		, use_friday boolean
		, use_saturday boolean
	)
	AS $$
	SELECT
		t2.begin_hour::time WITHOUT time zone
		, t2.end_hour::time WITHOUT time zone
		, (t2.effective_mask & B'0000001') <> 0::bit(7) use_monday
		, (t2.effective_mask & B'0000010') <> 0::bit(7) use_tuesday
		, (t2.effective_mask & B'0000100') <> 0::bit(7) use_wednesday
		, (t2.effective_mask & B'0001000') <> 0::bit(7) use_thursday
		, (t2.effective_mask & B'0010000') <> 0::bit(7) use_friday
		, (t2.effective_mask & B'0100000') <> 0::bit(7) use_saturday
		, (t2.effective_mask & B'1000000') <> 0::bit(7) use_sunday
	FROM (
		SELECT
			t1.begin_day
			, t1.end_day
			, t1.begin_hour
			, t1.end_hour
			, CASE WHEN (di_b.day_bit <= di_e.day_bit) THEN
				bit_or(di_m1.day_bit)
			ELSE
				~ ((di_b.day_bit | di_e.day_bit) # bit_or(di_m1.day_bit))
			END effective_mask
		FROM (
			SELECT
				hourset
				, CASE WHEN (substring(hourset , 0 , POSITION(':' IN hourset))
					LIKE '%-%') THEN
					substring(substring(hourset , 0 , POSITION(':' IN hourset)) , 0 , POSITION('-' IN substring(hourset , 0 , POSITION(':' IN hourset)))) -- return the first day
				ELSE
					substring(hourset , 0 , POSITION(':' IN hourset)) -- return the one and only day
				END AS begin_day
				, CASE WHEN (substring(hourset , 0 , POSITION(':' IN hourset))
					LIKE '%-%') THEN
					substring(substring(hourset , 0 , POSITION(':' IN hourset)) , POSITION('-' IN substring(hourset , 0 , POSITION(':' IN hourset))) + 1) -- return the last day
				ELSE
					substring(hourset , 0 , POSITION(':' IN hourset)) -- return the one and only day
				END AS end_day
				, substring(substring(hourset , POSITION(':' IN hourset) + 1) , 0 , POSITION('-' IN substring(hourset , POSITION(':' IN hourset) + 1))) begin_hour
				, substring(substring(hourset , POSITION(':' IN hourset) + 1) , POSITION('-' IN substring(hourset , POSITION(':' IN hourset) + 1)) + 1) end_hour
			FROM (
				SELECT
					UNNEST(STRING_TO_ARRAY(REPLACE(param_officehoursstring , ' ' , '') , ';')) hourset) t0) t1
			INNER JOIN ref_dayofweekindex di_b ON t1.begin_day = di_b.day_name
			INNER JOIN ref_dayofweekindex di_e ON t1.end_day = di_e.day_name
			LEFT OUTER JOIN ref_dayofweekindex di_m1 ON CASE WHEN (di_b.day_bit < di_e.day_bit) THEN
				di_m1.day_bit >= di_b.day_bit
					AND di_m1.day_bit <= di_e.day_bit
				ELSE
					di_m1.day_bit >= di_e.day_bit
					AND di_m1.day_bit <= di_b.day_bit
			END
	GROUP BY
		t1.begin_day
		, t1.end_day
		, t1.begin_hour
		, t1.end_hour
		, di_b.day_bit
		, di_e.day_bit) t2
$$
LANGUAGE SQL;

ALTER TABLE jurisdiction
	DROP COLUMN is_not_valid ,
	ADD COLUMN is_eaj BOOLEAN NOT NULL DEFAULT TRUE ,
	ADD COLUMN is_eaj_exclusive BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE wip_jurisdiction
	DROP COLUMN is_not_valid;

