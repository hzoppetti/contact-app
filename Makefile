include .env

export

create_db:
	@echo "Creating the DB"
	@psql -d ${API_PG_BASE} -U ${API_PG_USER} -tAc "SELECT 1 FROM pg_database WHERE datname='${API_PG_DATABASE}'" | grep -q 1 || psql -d ${API_PG_BASE} -U ${API_PG_USER} -c "CREATE DATABASE ${API_PG_DATABASE};"
	@psql -d ${API_PG_DATABASE} -U ${API_PG_USER} -c "CREATE TABLE IF NOT EXISTS ${API_PG_TABLE} (ID SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30), phone VARCHAR(20));"

load_dev_db: create_db
	@echo "DB ready but empty"

drop_db:
	@echo "Dropping the DB"
	@psql -d ${API_PG_DATABASE} -U ${API_PG_USER} -c "TRUNCATE TABLE ${API_PG_TABLE};"
	@psql -d ${API_PG_BASE} -U ${API_PG_USER} -c "DROP DATABASE ${API_PG_DATABASE};"

unload_dev_db: drop_db
	@echo "Table and DB removed"

.PHONY: dev_db create_db unload_dev_db drop_db