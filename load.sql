-- Connect to the infinimon database
\c infinimon;

-- Populate the pokemon table
COPY pokemon(pokemon, type, species, height, weight, abilities, ev_yield, catch_rate, base_friendship, base_exp, growth_rate, egg_groups, gender, egg_cycles, hp_base, hp_min, hp_max, attack_base, attack_min, attack_max, defense_base, defense_min, defense_max, special_attack_base, special_attack_min, special_attack_max, special_defense_base, special_defense_min, special_defense_max, speed_base, speed_min, speed_max)
FROM '/absolute/path/infinimon/data/archive/pokemonDB_dataset.csv' DELIMITER ',' CSV HEADER;

-- Remove columns that are not needed:
-- type, species, height, weight, ev_yield, catch_rate, base_friendship, base_exp, growth_rate, egg_groups, egg_cycles, hp_min, hp_max, attack_min, attack_max, defense_base, defense_min, defense_max, special_attack_base, special_attack_min, special_attack_max, special_defense_base, special_defense_min, special_defense_max, speed_base, speed_min, speed_max)

ALTER TABLE pokemon DROP COLUMN type;
ALTER TABLE pokemon DROP COLUMN species;
ALTER TABLE pokemon DROP COLUMN height;
ALTER TABLE pokemon DROP COLUMN weight;
ALTER TABLE pokemon DROP COLUMN ev_yield;
ALTER TABLE pokemon DROP COLUMN catch_rate;
ALTER TABLE pokemon DROP COLUMN base_friendship;
ALTER TABLE pokemon DROP COLUMN base_exp;
ALTER TABLE pokemon DROP COLUMN growth_rate;
ALTER TABLE pokemon DROP COLUMN egg_groups;
ALTER TABLE pokemon DROP COLUMN egg_cycles;
ALTER TABLE pokemon DROP COLUMN hp_min;
ALTER TABLE pokemon DROP COLUMN hp_max;
ALTER TABLE pokemon DROP COLUMN attack_min;
ALTER TABLE pokemon DROP COLUMN attack_max;
ALTER TABLE pokemon DROP COLUMN defense_base;
ALTER TABLE pokemon DROP COLUMN defense_min;
ALTER TABLE pokemon DROP COLUMN defense_max;
ALTER TABLE pokemon DROP COLUMN special_attack_base;
ALTER TABLE pokemon DROP COLUMN special_attack_min;
ALTER TABLE pokemon DROP COLUMN special_attack_max;
ALTER TABLE pokemon DROP COLUMN special_defense_base;
ALTER TABLE pokemon DROP COLUMN special_defense_min;
ALTER TABLE pokemon DROP COLUMN special_defense_max;
ALTER TABLE pokemon DROP COLUMN speed_base;
ALTER TABLE pokemon DROP COLUMN speed_min;
ALTER TABLE pokemon DROP COLUMN speed_max;
