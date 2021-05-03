.PHONY: reallyhardrebuild rebuild

# take down the docker compose network, remove old image and rebuild with no cache
rebuild:
	docker-compose build --no-cache ballotnav
	docker-compose up --force-recreate

# for a truly clean restart
reallyhardrebuild:
	docker-compose stop
	@echo "!!!!!!!!!!!!! Removing all the things I hope you really meant to do this!!!!!!!!!!!!!!"
	docker-compose down --rmi local --volumes
	docker-compose pull 
	docker-compose build --no-cache ballotnav
	docker-compose up --force-recreate
