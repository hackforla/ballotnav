CREATE TABLE location_geocode (
	id serial NOT NULL
	, address1 text NOT NULL
	, city text NOT NULL
	, state text NOT NULL
	, zip text NOT NULL
	, geocoder_name text NOT NULL
	, geocode_response text
	, address_match_quantity integer
	, statefips text
	, countyfips text
	, countyname text
	, latitude text
	, longitude text
	, inserted_at timestamp with time zone DEFAULT now()
	, PRIMARY KEY (id)
	, CONSTRAINT location_geocode_uq1 UNIQUE (address1 , city , state , zip , geocoder_name)
);

CREATE VIEW measurements AS
SELECT
	'jurisdictions_being_edited' AS measure
	, COUNT(DISTINCT jurisdiction_id) AS measurement
FROM
	jurisdictions_with_currwip
WHERE
	editor_user_id IS NOT NULL
UNION ALL
SELECT
	'jurisdictions_never_edited'
	, COUNT(DISTINCT id)
FROM
	jurisdiction
WHERE
	is_eaj IS TRUE
	AND wip_jurisdiction_id IS NULL
UNION ALL
SELECT
	'jurisdictions_ever_edited'
	, COUNT(DISTINCT id)
FROM
	jurisdiction
WHERE
	is_eaj IS TRUE
	AND wip_jurisdiction_id IS NOT NULL
UNION ALL
SELECT
	'jurisdictions_with_no_locations'
	, COUNT(j.id)
FROM
	jurisdiction j
	LEFT JOIN LOCATION l ON j.id = l.jurisdiction_id
WHERE
	l.id IS NULL
UNION ALL
SELECT
	'jurisdictions_needing_review'
	, COUNT(*)
FROM
	wip_jurisdictions_needing_review;

