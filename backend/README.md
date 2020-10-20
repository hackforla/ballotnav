# ballotnav backend
source code and scripts for the ballotnav application.
The raw data is available for download at
[http://raw-data.ballotnav.org/data.zip](http://raw-data.ballotnav.org/data.zip)
and instructions for loading it are [here](http://raw-data.ballotnav.org/README.txt)

# prerequisites
for local development with a full webserver and postgres instance within docker, ensure the following are installed:
- docker at v19.03+ [Install instructions by platform](https://docs.docker.com/get-docker/)

## getting started
`cd` to the `backend` folder and in a terminal do:

```bash
docker-compose up --build
```

:eyes: The `--build` option is necessary for the first time you boot the app, as it
builds the application and its dependencies (`node_modules`) but you
can drop it on subsequent start ups if you've not added new packages. 

**example docker-compose up**
```bash
$ docker-compose up
Starting backend_db_1 ... done
Recreating backend_ballotnav_1 ... done
Attaching to backend_db_1, backend_ballotnav_1
ballotnav_1  | Checking status of pending migrations:
db_1         |
db_1         | PostgreSQL Database directory appears to contain a database; Skipping initialization
db_1         |
db_1         | 2020-09-23 02:46:16.469 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
db_1         | 2020-09-23 02:46:16.469 UTC [1] LOG:  listening on IPv6 address "::", port 5432
db_1         | 2020-09-23 02:46:16.493 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
db_1         | 2020-09-23 02:46:16.636 UTC [25] LOG:  database system was shut down at 2020-09-20 19:56:47 UTC
db_1         | 2020-09-23 02:46:16.688 UTC [1] LOG:  database system is ready to accept connections
ballotnav_1  |
ballotnav_1  | Sequelize CLI [Node: 12.18.4, CLI: 6.2.0, ORM: 6.3.5]
ballotnav_1  |
ballotnav_1  | Loaded configuration file "config/config.json".
ballotnav_1  | Using environment "development".
ballotnav_1  | up 20200919055731-state-and-county-tables.js
ballotnav_1  | up 20200919061608-create-state.js
ballotnav_1  | up 20200920042755-initial-sync.js
ballotnav_1  | up 20200920054750-seed-states.js
ballotnav_1  | up 20200920061547-seed-jurisdictions.js
ballotnav_1  | up 20200920064108-seed-locations.js
ballotnav_1  | Running sequelize migrations...
ballotnav_1  |
ballotnav_1  | Sequelize CLI [Node: 12.18.4, CLI: 6.2.0, ORM: 6.3.5]
ballotnav_1  |
ballotnav_1  | Loaded configuration file "config/config.json".
ballotnav_1  | Using environment "development".
ballotnav_1  | No migrations were executed, database schema was already up to date.
ballotnav_1  | Success applying migrations
ballotnav_1  |
ballotnav_1  | > ballot-nav-backend@1.0.0 dev /ballotnav
ballotnav_1  | > npx nodemon -L app.js
ballotnav_1  |
ballotnav_1  | [nodemon] 2.0.4
ballotnav_1  | [nodemon] to restart at any time, enter `rs`
ballotnav_1  | [nodemon] watching path(s): *.*
ballotnav_1  | [nodemon] watching extensions: js,mjs,json
ballotnav_1  | [nodemon] starting `node app.js`
ballotnav_1  | App listening on port 8080
```

### development
The `docker-compose` should launch a database instance running on 127.0.0.1:5434
and an express webserver at 127.0.0.1:8080.
You can open [http://localhost:8080/status](http://localhost:8080/status) in
your browser to see a status message.

#### local database
you should be able to attach to the running postgres container with your
favorite database client. [https://www.tableplus.io/](https://www.tableplus.io/)
is a nice one if you don't have a favorite. 

The connection parameters are set in the
[docker-compose.yml](./docker-compose.yml) file.

```yaml
  db:
    image: postgres:11
    restart: always
    environment:
      POSTGRES_USER: ballotnav
      POSTGRES_DB: main
      POSTGRES_PASSWORD: pgpass
```

Using `psql` do: 
```bash
$ psql -U ballotnav -d main -p 5434 -h localhost
```

and enter the value of `POSTGRES_PASSWORD` in docker-compose.yml.

#### troubleshooting
If something is acting strange try a clean rebuild. In terminal from within the
`backend/` folder do:

```bash
$ make rebuild
```

If you still get some errors, such as module not found or other weirdness
there's always the _nuclear option_ :boom: this will wipe cache and data. 

```bash
$ make reallyhardrebuild
```
