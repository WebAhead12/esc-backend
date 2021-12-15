BEGIN;

DROP TABLE IF EXISTS users,teams,request,invite CASCADE;

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    username varchar(36),
    password varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    age INTEGER,
    languages varchar(255),
    gender varchar(255),
    imagelink varchar(255),
    location varchar(255),
    registerdate DATE DEFAULT CURRENT_TIMESTAMP,
    stats json
);

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    teamname varchar(36),
    password varchar(255),
    email varchar(255),
    description varchar(255),
    imagelink varchar(255),
    players json,
    games json
);

CREATE TABLE requests(
    playerid INTEGER REFERENCES players(id),
    teamid INTEGER REFERENCES teams(id),
    content json,
    status varchar(12)
);

CREATE TABLE invites(
    playerid INTEGER REFERENCES players(id),
    teamid INTEGER REFERENCES teams(id),
    status varchar(12)
);

COMMIT;