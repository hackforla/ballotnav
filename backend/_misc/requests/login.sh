#!/usr/bin/env bash
set -e -a

EMAIL=$1
PASS=$2
URL=localhost:8080/user/login

usage() {
    cat<<EOL
    Do a login call to the server:

        ./login.sh myname@email.com secret!123password
EOL
}

if [ -z $EMAIL ] || [ -z $PASS ]; then
    printf "%s\n" "Error: Missing required EMAIL or PASSWORD paramaters."
    usage
    exit 1
fi
printf "%s\n" "Logging in with email $EMAIL"

unset $token
token=$(curl -s -d '{"email": "'${EMAIL}'", "password": "'${PASS}'" }' -H 'Content-Type: application/json' $URL | jq -r .token)

printf "%s\n" "Saving token ${token}"
sed -i -r -E "s/Bearer .*/Bearer $token/g" headers.txt
