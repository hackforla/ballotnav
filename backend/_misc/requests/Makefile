PHONY: listWip createWip auth listWipLocation

EMAIL?=$(EMAIL)
PASSWORD?=$(PASSWORD)

HOST?=localhost:8080
CURL=curl -H @headers.txt

auth:
	./login.sh $(EMAIL) $(PASSWORD)

listWip: auth
	$(CURL) $(HOST)/jurisdictions/wip | jq '.'

createWip: auth
	$(CURL) -d @wip-jurisdiction.json $(HOST)/jurisdictions/wip | jq '.'

updateWip: auth
	$(CURL) -X PUT -d @update-jurisdiction.json $(HOST)/jurisdictions/wip/$(ID) | jq

listWipLocation: auth
	test $(ID) || echo "error missing ID" \
		$(CURL) $(HOST)/jurisdictions/wip/$(ID)/locations
