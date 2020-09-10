--- dropoff data
CREATE TABLE dropoffs (
    id integer PRIMARY KEY SERIAL,
    state_name varchar(20) NOT NULL,
    state_short_code varchar(2) NOT NULL,
    county varchar(100) NOT NULL,
    postition varchar(255),
    contact_name varchar(255),
    address_1 varchar(255),
    address_2 varchar(255),
    email varchar(255),
    fax varchar(40),
    phone varchar(40),
    county_website varchar(255),
    source_url varchar(255) latitude numeric,
    longitude numeric,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--- rules data
CREATE TABLE rules (
    id integer PRIMARY key serial,
    name text NOT NULL,
    description text NOT NULL,
)
--- dropoff requirements
CREATE TABLE dropoff_requirements (
    dropoff_id integer REFERENCES dropoffs (id),
    rule_id integer REFERENCES rules (id))
