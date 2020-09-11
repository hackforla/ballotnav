# Backend

## Requirements
- [Docker](https://www.docker.com)
- [Docker-compose](https://docs.docker.com/compose/install/)
- python 3.7+

## Running
### with docker
To run the  app locally within docker-compose do:


```bash
docker-compose up --build
```

After running the first time with you may drop the `--build` option on
subsequent starts for a quicker startup.

### without docker
It may be unnecessary or even undesirable to run the full webserver and database
in docker. You should be able to start a local flask server by:

1. create a python virtual environment
```bash
# ensure that however you invoke python you've got at least version 3.7
# you may find that you need to run it as python3 instead of python depending on
# your system installation
python -V 3.7.0
# create a virtual env called "venv"
python -m venv venv

# activate it so that all your installs are local to the ballotnav/backend
# directory
source venv/bin/activate

# now install the requireents
pip install -r requirements-dev.txt

# once that completes run the local flask app
FLASK_APP=ballotnav flask run --debugger --host=127.0.0.1
$ FLASK_APP=ballotnav flask run
 * Serving Flask app "ballotnav"
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)

# open localhost:5000/ping in your browser!
```

## database migrations
We use a handy flask extension for managing changes to the database schemas
[Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/#api-reference)

For example, to create a new table or alter an existing one, we should create a
migration script to do that for us to limit the chances of human error.

**example**
```bash
# start the app
docker-compose up -d

# generate a migration file
docker-compose exec ballotnav flask db revision -m "create new locations table"
```

This will generate a file in the [migrations](./ballotnav/migrations) folder
that has a slug "create-new-locations-table" in the file name.

Fill out the python code to perform the kind of schema change you wish.

Upon restarting the docker-compose the `flask db upgrade` command will run and
apply that migration as the latest. And the new table should be visible in the
db.


# Overview
TODO @jafow
- how the parts connect
