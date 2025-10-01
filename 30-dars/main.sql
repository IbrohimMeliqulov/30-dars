CREATE TABLE  tournaments(
    tournament_id SERIAL PRIMARY KEY,
    tournament_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20)
);


CREATE TABLE tournament_groups(
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(100) UNIQUE,
    tournament_id int REFERENCES tournaments(tournament_id),
    created_at TIMESTAMP
);




CREATE TABLE teams(
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) REFERENCES tournament_groups(group_name),
    club_id SERIAL UNIQUE,
    group_id int REFERENCES tournament_groups(group_id),
    coach_name VARCHAR(100)
);


CREATE TABLE football_clubs(
    club_id int REFERENCES teams(club_id),
    club_name VARCHAR(100),
    city VARCHAR(100),
    country VARCHAR(100),
    founded_year int 
);


CREATE TABLE match_fixtures(
    match_id SERIAL PRIMARY KEY,
    match_date TIMESTAMP,
    venue VARCHAR(100),
    home_team_id int REFERENCES teams(team_id),
    away_team_id int REFERENCES teams(team_id),
    home_score int,
    away_score int,
    tournament_id int REFERENCES tournaments(tournament_id),
    match_status VARCHAR(20) 
);


CREATE TABLE players(
    player_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    date_of_birth DATE,
    position VARCHAR(50),
    team_id int REFERENCES teams(team_id),
    jersey_number int
);