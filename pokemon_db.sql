
-- Create the infinimon database
CREATE DATABASE infinimon;

-- Connect to the infinimon database
\c infinimon;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL
);

-- Create the pokemon table
CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    Pokemon VARCHAR(50),
    Type VARCHAR(50),
    Species VARCHAR(50),
    Height VARCHAR(50),
    Weight VARCHAR(50),
    Abilities VARCHAR(100),
    EV_Yield VARCHAR(50),
    Catch_Rate VARCHAR(50),
    Base_Friendship VARCHAR(50),
    Base_Exp VARCHAR(50),
    Growth_Rate VARCHAR(50),
    Egg_Groups VARCHAR(50),
    Gender VARCHAR(50),
    Egg_Cycles VARCHAR(50),
    HP_Base INT,
    HP_Min INT,
    HP_Max INT,
    Attack_Base INT,
    Attack_Min INT,
    Attack_Max INT,
    Defense_Base INT,
    Defense_Min INT,
    Defense_Max INT,
    Special_Attack_Base INT,
    Special_Attack_Min INT,
    Special_Attack_Max INT,
    Special_Defense_Base INT,
    Special_Defense_Min INT,
    Special_Defense_Max INT,
    Speed_Base INT,
    Speed_Min INT,
    Speed_Max INT
);

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



