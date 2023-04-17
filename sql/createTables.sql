

CREATE TABLE IF NOT EXISTS developers(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS developers_info(
    "id" SERIAL PRIMARY KEY,
    "developerSince" DATE NOT NULL,
    "preferredOs" OS NOT NULL,
    "developerId" INTEGER NOT NULL UNIQUE,
    FOREIGN KEY("developerId") REFERENCES developers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (50) NOT NULL,
    "description" TEXT,
    "estimatedTime" VARCHAR (20) NOT NULL,
   " repository" VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "developerId" INTEGER NOT NULL,
    FOREIGN KEY ("developerId") REFERENCES developers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS technologies(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (30) NOT NULL
);

INSERT INTO technologies (name) VALUES
  ('JavaScript'),
  ('Python'),
  ('React'),
  ('Express.js'),
  ('HTML'),
  ('CSS'),
  ('Django'),
  ('PostgreSQL'),
  ('MongoDB');


CREATE TABLE IF NOT EXISTS projects_technologies(
    "id" SERIAL PRIMARY KEY,
    "addedIn" DATE NOT NULL,
    "technologyId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    FOREIGN KEY ("technologyId") REFERENCES technologies(id) ON DELETE CASCADE,
    FOREIGN KEY ("projectId") REFERENCES projects_technologies(id) ON DELETE CASCADE
);
