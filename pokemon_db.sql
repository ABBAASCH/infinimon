-- Create the infinimon database
CREATE DATABASE infinimon;

-- Connect to the infinimon database
\c infinimon;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- Create the pokemon table
CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    Pokemon VARCHAR(50),
    Abilities VARCHAR(100),
    Gender VARCHAR(50),
    HP_Base INT,
    Attack_Base INT,
);

-- Populate the pokemon table
COPY pokemon(pokemon, abilities, gender, hp_base, attack_base)
FROM './data/archive/pokemonDB_dataset.csv'
DELIMITER ',' CSV HEADER;

-- Create the teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    pokemon1_id INTEGER NOT NULL,
    pokemon2_id INTEGER NOT NULL,
    pokemon3_id INTEGER NOT NULL,
    pokemon4_id INTEGER NOT NULL,
    pokemon5_id INTEGER NOT NULL,
    pokemon6_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (pokemon1_id) REFERENCES pokemon (id),
    FOREIGN KEY (pokemon2_id) REFERENCES pokemon (id),
    FOREIGN KEY (pokemon3_id) REFERENCES pokemon (id),
    FOREIGN KEY (pokemon4_id) REFERENCES pokemon (id),
    FOREIGN KEY (pokemon5_id) REFERENCES pokemon (id),
    FOREIGN KEY (pokemon6_id) REFERENCES pokemon (id)
);

-- Create the querytest table
CREATE TABLE IF NOT EXISTS querytest (
    query_word character(10)
);

-- Insert value into the querytest table
INSERT INTO querytest (query_word) VALUES ('HELLO_DB');
