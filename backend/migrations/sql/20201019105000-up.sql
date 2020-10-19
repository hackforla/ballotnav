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

