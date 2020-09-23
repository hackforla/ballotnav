.PHONY: rebuild

# take down the docker compose network, remove old image and rebuild with no cache
# for a truly clean restart
rebuild:
	docker-compose stop
	docker-compose up --build --force-recreate
