BEGIN;

DROP TABLE IF EXISTS players,teams,requests,invites,games CASCADE;

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    username varchar(36),
    password varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255) UNIQUE,
    age varchar(100),
    languages varchar(255),
    gender varchar(255),
    imagelink varchar(255),
    location varchar(255),
    registerdate DATE DEFAULT CURRENT_TIMESTAMP,
    games json
);

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    teamname varchar(36),
    password varchar(255),
    name varchar(255),
    email varchar(255) UNIQUE,
    description varchar(255),
    imagelink varchar(255),
    game varchar(36),
    requirements json
);

CREATE TABLE requests(
    id SERIAL PRIMARY KEY,
    playerid INTEGER REFERENCES players(id),
    teamid INTEGER REFERENCES teams(id),
    status varchar(12) DEFAULT 'Pending'
);

CREATE TABLE invites(
    id SERIAL PRIMARY KEY,
    playerid INTEGER REFERENCES players(id),
    teamid INTEGER REFERENCES teams(id),
    status varchar(12) DEFAULT 'Pending'
);

CREATE TABLE games(
    id SERIAL PRIMARY KEY,
    value varchar(36),
    label varchar(36)
);






COMMIT;