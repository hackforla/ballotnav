#!/usr/bin/env bash
# update a jurisdiction
URL=localhost:8080/admin/wip/jurisdictions/11

curl -X PUT -d @update-jurisdiction.json -s -H @headers.txt $URL

