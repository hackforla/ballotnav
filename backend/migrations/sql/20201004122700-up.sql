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

