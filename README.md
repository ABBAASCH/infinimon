# Infinimon

Dependencies:
```
# For database connection
npm install pg

npm install ejs

npm install dotenv

npm install bcrypt passport express-session
```

To serve the project on localhost on the port given in app.js:
```
npm run start
```

Commands used for the project are listed below.

```
# Connect to db with postgres CLI
psql -d infinimon -U <username>

# Create the table
CREATE TABLE pokemon (
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

# Populate the table
COPY pokemon(pokemon,type,species,height,weight,abilities,ev_yield,catch_rate,base_friendship,base_exp,growth_rate,egg_groups,gender,egg_cycles,hp_base,hp_min,hp_max,attack_base,attack_min,attack_max,defense_base,defense_min,defense_max,special_attack_base,special_attack_min,special_attack_max,special_defense_base,special_defense_min,special_defense_max,speed_base,speed_min,speed_max)
FROM '/path/to/csv/pokemon.csv'
DELIMITER ',' CSV HEADER;
```

```
# Add an id column to the pokemon table for creating the teams
ALTER TABLE pokemon ADD COLUMN id SERIAL PRIMARY KEY;
```

```
# Create the teams table
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
```

