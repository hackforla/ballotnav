#!/bin/sh
set -e 

# check if we should run migrations
if [ -z $DISABLE_DB_MIGRATION_AUTO_RUN ]; then
    printf "%s\n" "Checking status of pending migrations:"
    npx sequelize-cli db:migrate:status

    printf "%s\n" "Running sequelize migrations..."
    npx sequelize-cli db:migrate

    if [ $? -gt 0 ]; then
        printf "%s\n" "=================================="
        printf "%s\n" "Error running migrations; Exiting."
        printf "%s\n" "=================================="
    else
        printf "%s\n" "Success applying migrations"
    fi
fi

exec "$@"
