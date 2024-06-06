-- setup_pokemon_db_modified.sql

-- Connect to the database using psql CLI
-- psql -d infinimon -U <username>

-- Create the pokemon table
DROP TABLE IF EXISTS pokemon;
CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    Pokemon VARCHAR(50),
    Type VARCHAR(50),
    Speed INT,
    HP INT,
    Defense INT,
    Attack INT
);

-- Populate the pokemon table from CSV
COPY pokemon(
    Pokemon, Type, Speed, HP, Defense, Attack
)
FROM PROGRAM 'cat /path/to/csv/pokemon.csv | awk -F, ''NR==1 {for (i=1; i<=NF; i++) col[$i] = i} NR>1 {print $col["Pokemon"], $col["Type"], $col["Speed_Base"], $col["HP_Base"], $col["Defense_Base"], $col["Attack_Base"]}'' OFS=,' DELIMITER ',' CSV HEADER;

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
