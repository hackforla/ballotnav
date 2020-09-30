#!/usr/bin/env python3

import os.path
import argparse
import csv
import psycopg2
from psycopg2 import Error

parser = argparse.ArgumentParser()
parser.add_argument("filename", help="path to filename", type=str)
parser.add_argument("tablename", help="destination pg tablename", type=str)
args = parser.parse_args()

if not os.path.isfile(args.filename):
	print("File not found.")
	exit()

cols=[]
csvdata = csv.DictReader(open(args.filename,encoding="UTF-8-sig"))
for row in csvdata:
    for col in row:
        cols.append(col.replace(' ', '').lower())
    break

try:
	conn = psycopg2.connect(user = "ballotnav",
								password = "pgpass",
								host = "127.0.0.1",
								port = "5434",
								database = "main")
	cursor = conn.cursor()

	newtable_query = '''
		CREATE TABLE public.{0}
		(
		csv_row_id integer generated always as identity
		)
		TABLESPACE pg_default;
		'''

	cursor.execute(newtable_query.format(args.tablename))
	conn.commit()

except (Exception, psycopg2.DatabaseError) as error :
	print ("Error while creating PostgreSQL table", error)

for col in cols:
	newcol_query = 'ALTER TABLE public.{0} ADD COLUMN {1} text;'
	cursor.execute(newcol_query.format(args.tablename,col))
	conn.commit()

col_statement = ','.join(cols)
bindparams='%s,'*len(cols)
bindparams=bindparams[0:len(bindparams)-1]
insertquery = 'INSERT INTO public.{0}({1}) VALUES ({2})'.format(args.tablename, col_statement, bindparams)

csvdata = csv.DictReader(open(args.filename,encoding="UTF-8-sig"))
for row in csvdata:
	try:
		cursor.execute(insertquery, list(row.values()))
		conn.commit()
	except (Exception, psycopg2.Error) as error :
		print("Failed to insert record", error)

if(conn):
	cursor.close()
	conn.close()
