#!/usr/bin/env python3

import json
import requests
import urllib.request
import urllib.parse
import time
import psycopg2
from psycopg2 import Error

try:
    conn = psycopg2.connect(user="ballotnav",
                            password="",
                            host="127.0.0.1",
                            port="5435",
                            database="main")
    cursor = conn.cursor()

except (Exception, psycopg2.DatabaseError) as error:
    print("Error while connecting to PostgreSQL", error)

cursor.execute("""
SELECT t0.*
FROM (
	SELECT DISTINCT l.address1, l.city, l.state, l.zip, l.address1 || ', ' || l.city || ', ' ||  l.state || ' ' || l.zip one_line_address
	FROM location l
	WHERE l.geom_latitude IS NULL
	AND l.address1 IS NOT NULL
	AND l.city IS NOT NULL
	AND l.state IS NOT NULL
	AND l.zip IS NOT NULL
	AND trim(l.address1) <> ''
	AND trim(l.city) <> ''
	AND trim(l.state) <> ''
	AND trim(l.zip) <> ''
	AND trim(lower(l.address1)) NOT LIKE 'po %'
	UNION
	SELECT DISTINCT l.address1, l.city, l.state, l.zip, l.address1 || ', ' || l.city || ', ' ||  l.state || ' ' || l.zip one_line_address
	FROM wip_jurisdiction wj
	INNER JOIN wip_location l ON wj.id = l.wip_jurisdiction_id
	WHERE l.geom_latitude IS NULL
	AND l.address1 IS NOT NULL
	AND l.city IS NOT NULL
	AND l.state IS NOT NULL
	AND l.zip IS NOT NULL
	AND trim(l.address1) <> ''
	AND trim(l.city) <> ''
	AND trim(l.state) <> ''
	AND trim(l.zip) <> ''
	AND trim(lower(l.address1)) NOT LIKE 'po %'
) t0
LEFT OUTER JOIN location_geocode lg ON t0.address1 = lg.address1 AND t0.city = lg.city AND t0.state = lg.state AND t0.zip=lg.zip AND lg.geocoder_name = 'geocod.io'
WHERE lg.id IS NULL
AND t0.state = 'GA'
LIMIT 5000
""")
rows = cursor.fetchall()
for row in rows:
    tic = time.perf_counter()
    a_address1 = row[0]
    a_city = row[1]
    a_state = row[2]
    a_zip = row[3]
    address = row[4]
    url_call = 'https://api.geocod.io/v1.6/geocode?api_key=CHANGEME_THIS_IS_AN_EXAMPLE_CHANGEME&q={0}'.format(
        urllib.parse.quote(address))
    req = requests.get(url_call)
    resp = req.json()
    if 'error' in resp:
        print('error in geocode response')
        print(resp)
        exit()
    if (not 'results' in resp):
        t = (a_address1, a_city, a_state, a_zip,
             'geocod.io', 0, json.dumps(resp))
        insertquery = """INSERT INTO location_geocode (address1, city, state, zip, geocoder_name, address_match_quantity, geocode_response) VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        cursor.execute(insertquery, t)
        conn.commit()
    elif len(resp['results']) > 0:
        for amatch in (resp['results']):
            lat = amatch['location']['lat']
            lon = amatch['location']['lng']
            break
        t = (a_address1, a_city, a_state, a_zip, 'geocod.io',
             len(resp['results']), json.dumps(resp), lat, lon)
        insertquery = """INSERT INTO location_geocode (address1, city, state, zip, geocoder_name, address_match_quantity, geocode_response, latitude, longitude) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        cursor.execute(insertquery, t)
        conn.commit()
    else:
        t = (a_address1, a_city, a_state, a_zip,
             'geocod.io', 0, json.dumps(resp))
        insertquery = """INSERT INTO location_geocode (address1, city, state, zip, geocoder_name, address_match_quantity, geocode_response) VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        cursor.execute(insertquery, t)
        conn.commit()
    toc = time.perf_counter()
    timediff = toc-tic
    print(f"{timediff:0.4f} seconds")
