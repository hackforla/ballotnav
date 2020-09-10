--- dropoff data
create table dropoffs (
    id integer PRIMARY KEY SERIAL,
    state_name varchar(10) NOT NULL,
    state_short_code varchar(2) NOT NULL,
    county varchar(255) NOT NULL,
    postition varchar(255),
    contact_name varchar(255),
    address_1 varchar(255),
    address_2 varchar(255),
    email varchar(255),
    fax varchar(255),
    phone varchar(255),
    county_website varchar(255),
    source_url varchar(255)
    latitude numeric,
    longitude numeric
);
