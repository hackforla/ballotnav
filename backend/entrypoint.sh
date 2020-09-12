#!/usr/bin/env bash
set -e 

# apply and db migrations
flask db upgrade

if [[ $? -gt 0 ]]; then
    printf "error applying db migrations; exiting\n"
    exit 1
else
    printf "%s\n" "🗳️SUCCCES: db migrations applied and up to date 🗳️\n"
fi

exec "$@"
