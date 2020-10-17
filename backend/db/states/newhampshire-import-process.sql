./csv2pg.py ./states/newhampshire.csv import_newhampshire

UPDATE import_newhampshire
SET clerk = trim(initcap(clerk)),
address_1 = trim(initcap(address_1)),
address_2 = trim(initcap(address_2)),
pobox = trim(pobox);

UPDATE import_newhampshire
SET address_zip = '0'||address_zip
WHERE length(address_zip) = 4;

SELECT DISTINCT town_name as name, clerk, phone, fax, email, website, address_1, address_2, address_city, address_state, address_zip, pobox
INTO import_newhampshire_distinct
FROM import_newhampshire
;

DROP TABLE import_newhampshire;

SELECT *
INTO import_newhampshire
FROM import_newhampshire_distinct;

DROP TABLE import_newhampshire_distinct;

INSERT INTO public.jurisdiction (state_id, name, is_eaj, is_eaj_exclusive)
SELECT s.id, imp.name, true, true
FROM import_newhampshire imp
CROSS JOIN state s
WHERE s.abbreviation = 'NH'
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
CROSS JOIN public.user u
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
AND imp.phone IS NOT NULL
AND trim(imp.phone) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
AND imp.fax IS NOT NULL
AND trim(imp.fax) <> ''
AND pnt.name = 'Fax'
;

-- insert county URL
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, CASE WHEN (left(imp.website,4)<>'http') THEN 
'https://'||imp.website
ELSE imp.website
END AS website_url, j.name
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
AND imp.website IS NOT NULL
AND trim(imp.website) <> ''
AND urlt.name = 'Jurisdiction Elections Website'
;

-- insert email addresses
INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, imp.email, imp.email
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'Clerk Email Address'
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, address2, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Clerk of ' || j.name, initcap(imp.address_1), initcap(trim(imp.address_2)), initcap(imp.address_city), 'NH', imp.address_zip, 'newhampshire-office' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
AND imp.address_1 IS NOT NULL
AND trim(imp.address_1) <> ''
;

-- correct the authority name
UPDATE wip_jurisdiction
SET authority_name = t0.authority_name
FROM (
	SELECT cwj.wip_jurisdiction_id, imp.clerk || ', Clerk of ' || j.name authority_name
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newhampshire imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'NH'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- insert the mailing address
UPDATE wip_jurisdiction
SET mail_address1 = t0.mail_address1,
mail_address2 = t0.mail_address2
FROM (
	SELECT cwj.wip_jurisdiction_id, imp.pobox mail_address1, imp.address_city || ', NH ' || imp.address_zip mail_address2
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newhampshire imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'NH'
	AND u.email = 'drew@anullvalue.net'
	AND imp.pobox IS NOT NULL
	AND trim(imp.pobox) <> ''
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- mark as released 
UPDATE wip_jurisdiction
SET is_released = true
FROM (
	SELECT cwj.wip_jurisdiction_id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newhampshire imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'NH'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(cwj.wip_jurisdiction_id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_newhampshire imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
WHERE s.abbreviation = 'NH'
AND u.email = 'drew@anullvalue.net'
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_newhampshire imp ON j.name = imp.name
	WHERE s.abbreviation = 'NH'
)
;

DROP TABLE import_newhampshire;
