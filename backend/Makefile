.PHONY: up
up:
	docker-compose up -d

.PHONY: build
build:
	docker-compose up -d --build

.PHONY: down
down:
	docker-compose down

.PHONY: bash
bash:
	docker-compose exec app bash

.PHONY: dump
dump:
	docker-compose exec postgres pg_dump -U softexpert -d db_softexpert_products > dump.sql

.PHONY: restore
restore:
	docker-compose exec -T postgres psql -U softexpert -d db_softexpert_products < dump.sql