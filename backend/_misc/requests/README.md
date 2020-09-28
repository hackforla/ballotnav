# test calls


A handful of quick scripts for seeing if the API is glued together properly.
These are more useful once data is loaded. Unzip the `example_data.zip` in the
`db/` folder.

Uses `jq` for pretty printing; Install is
[https://stedolan.github.io/jq/download/](https://stedolan.github.io/jq/download/).


## login
assuming you've done `/register` and have an admin user in the db;

```bash
export EMAIL=voter@email.com
export PASSWORD=secret123
make auth
```

## list wip jurisdictions
```bash
make listWip
```

## update wip
edit the `update-jurisdiction.json` file to update an item. Pass an id to the
record to update.

```bash
make updateWip ID=11
```
