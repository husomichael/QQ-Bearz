
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--Database for qq_bearz

-- "users" table for logging in.
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "soundclips" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" (id) ON DELETE CASCADE,
	"title" VARCHAR (80),
	"tags" VARCHAR (1000),
	"url" VARCHAR (1000)
);

CREATE TABLE "arakan_deaths" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" (id) ON DELETE CASCADE,
	"title" VARCHAR (80),
	"tags" VARCHAR (1000),
	"url" VARCHAR (1000)
);

CREATE TABLE "arakan_death_count" (
	"id" SERIAL PRIMARY KEY,
	"death_count" INT
);

INSERT INTO "arakan_death_count"
("death_count")
VALUES
(1);