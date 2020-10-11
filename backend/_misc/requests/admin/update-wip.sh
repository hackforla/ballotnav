#!/usr/bin/env bash
# update a wip jurisdiction 
URL=localhost:8080/admin/wip/jurisdictions/6

curl -X PUT -d @update-wip-jurisdiction.json -s -H @../headers.txt $URL
