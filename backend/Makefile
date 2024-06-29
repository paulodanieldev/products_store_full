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
	docker-compose exec db pg_dump -U postgres -d postgres > dump.sql