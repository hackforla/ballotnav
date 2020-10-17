ALTER TABLE import_wisconsin
ADD COLUMN name TEXT;

UPDATE import_wisconsin
SET hindi = right('00'||hindi,5),
name = CASE WHEN muni_type = 'T' THEN initcap(muni_name_short) || ', Town of (' || initcap(county_name) || ')' ELSE
CASE WHEN muni_type = 'V' THEN initcap(muni_name_short) || ', Village of (' || initcap(county_name) || ')' ELSE
CASE WHEN muni_type = 'C' THEN initcap(muni_name_short) || ', City of (' || initcap(county_name) || ')' ELSE
initcap(muni_name_short) END END END
;

INSERT INTO public.jurisdiction (state_id, name, is_eaj, is_eaj_exclusive)
SELECT s.id, wi.name, true, true
FROM import_wisconsin wi
CROSS JOIN state s
WHERE s.name = 'Wisconsin'
;

-- creates WipJurisdiction records for every jurisdiction in this import
SELECT wip_jurisdiction_create(j.id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
CROSS JOIN public.user u
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
;

-- inserts voice phone records
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone1
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
AND imp.phone1 IS NOT NULL
AND trim(imp.phone1) <> ''
AND pnt.name = 'Voice'
;

INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.phone2
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
AND imp.phone2 IS NOT NULL
AND trim(imp.phone2) <> ''
AND pnt.name = 'Voice'
;

-- inserts fax record
INSERT INTO wip_jurisdiction_phone (wip_jurisdiction_id, phonenumbertype_id, phone_number)
SELECT cwj.wip_jurisdiction_id, pnt.id, imp.fax
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN phonenumbertype pnt
WHERE s.abbreviation = 'WI'
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
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'WI'
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
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
AND imp.email IS NOT NULL
AND trim(imp.email) <> ''
AND urlt.name = 'Clerk Email Address'
;

INSERT INTO wip_jurisdiction_url (wip_jurisdiction_id, urltype_id, url, name)
SELECT cwj.wip_jurisdiction_id, urlt.id, imp.deputyclerkemail, imp.deputyclerkemail
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN urltype urlt
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
AND imp.deputyclerkemail IS NOT NULL
AND trim(imp.deputyclerkemail) <> ''
AND urlt.name = 'Deputy Clerk Email Address'
;

-- insert the offices
INSERT INTO wip_location (wip_jurisdiction_id, facilitytype_id, name, address1, city, state, zip, tempstring, schedule_type, schedule_description)
SELECT cwj.wip_jurisdiction_id, ft.id, 'Clerk of ' || j.name, initcap(imp.address_1), initcap(imp.city), 'WI', imp.zip, 'wisconsin-clerk-office' tempstring, 'description', 'Unknown'
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
CROSS JOIN (
	SELECT id FROM facilitytype WHERE name = 'Unknown'
	) ft 
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
;

-- correct the authority name
UPDATE wip_jurisdiction
SET authority_name = t0.authority_name
, mail_address1 = t0.mail_address1
, mail_address2 = t0.mail_address2
FROM (
	SELECT cwj.wip_jurisdiction_id, CASE WHEN (deputyclerkname IS NOT NULL AND trim(deputyclerkname) <> '') THEN
		'Clerk: ' || imp.clerkname || '; Deputy Clerk: ' || imp.deputyclerkname
		ELSE
		'Clerk: ' || imp.clerkname
		END AS authority_name
		, initcap(mailing_address_1) mail_address1, initcap(mailing_address_2) mail_address2
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_wisconsin imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WI'
	AND u.email = 'drew@anullvalue.net'
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
	INNER JOIN import_wisconsin imp ON j.name = imp.name
	INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
	INNER JOIN public.user u ON cwj.editor_user_id = u.id
	WHERE s.abbreviation = 'WI'
	AND u.email = 'drew@anullvalue.net'
) t0
WHERE wip_jurisdiction.id = t0.wip_jurisdiction_id
;

-- publish
SELECT wip_jurisdiction_publish(cwj.wip_jurisdiction_id, u.id)
FROM jurisdiction j
INNER JOIN state s ON j.state_id = s.id
INNER JOIN import_wisconsin imp ON j.name = imp.name
INNER JOIN jurisdictions_with_currwip cwj ON j.id = cwj.jurisdiction_id
INNER JOIN public.user u ON cwj.editor_user_id = u.id
WHERE s.abbreviation = 'WI'
AND u.email = 'drew@anullvalue.net'
;

-- mark unpublished
UPDATE jurisdiction
SET is_published = false
WHERE id IN (
	SELECT j.id
	FROM jurisdiction j
	INNER JOIN state s ON j.state_id = s.id
	INNER JOIN import_wisconsin imp ON j.name = imp.name
	WHERE s.abbreviation = 'WI'
)
;
