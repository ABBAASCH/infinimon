var express = require('express');
var router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

// For db connection test - do not delete
router.get('/db', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM querytest');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/infinimon', async (req, res) => {
    try {
        const result = await db.query('SELECT pokemon, id FROM pokemon');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);

// Route to fetch detailed Pokémon information
router.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name;
    try {
        const queryResult = await db.query(
            `SELECT * FROM pokemon WHERE Pokemon = $1`,
            [pokemonName]
        );
        const pokemonData = queryResult.rows[0];

        if (pokemonData) {
            // Assuming images are stored in a predictable file path
            const imagePath = `/images/Pokemon Images DB/${pokemonName}/${pokemonName}_new.png`;
            //const imagePath = '/images/Abra_new.png';
            pokemonData.image = imagePath;
            res.json(pokemonData);
        } else {
            res.status(404).json({ message: 'Pokémon not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/search', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM pokemon WHERE pokemon = $1', [req.body.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);


// Get the current user's team

router.get('/team', async (req, res) => {
    try {
        const userId = req.headers['user_id'];
        if (!userId) {
            return res.status(400).send('User ID is required');
        }

        const result = await db.query('SELECT * FROM teams WHERE user_id = $1', [userId]);
        res.json(result.rows[0] || null);
    } catch (err) {
        console.error('Error fetching team:', err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/team', async (req, res) => {
    try {
        const userId = req.headers['user_id'];
        const team = req.body.team;

        if (!userId) {
            return res.status(400).send('User ID is required');
        }

        if (!team || team.length !== 6) {
            return res.status(400).send('Team must have exactly 6 Pokémon');
        }

        await db.query('UPDATE teams SET pokemon1_id = $1, pokemon2_id = $2, pokemon3_id = $3, pokemon4_id = $4, pokemon5_id = $5, pokemon6_id = $6 WHERE user_id = $7', [
            team[0], team[1], team[2], team[3], team[4], team[5], userId
        ]);

        res.send('Team updated successfully');
    } catch (err) {
        console.error('Error updating team:', err.message);
        res.status(500).send('Server Error');
    }
});


// Remove a Pokémon from the user's team
router.delete('/team', async (req, res) => {
    try {
        const userId = req.user.id;
        const { pokemonId } = req.body;
        const team = await pool.query('SELECT * FROM teams WHERE user_id = $1', [userId]);

        if (team.rows.length === 0) {
            return res.status(400).send('No team found');
        }

        const currentTeam = team.rows[0];
        let columnToUpdate = null;
        for (const [key, value] of Object.entries(currentTeam)) {
            if (value === pokemonId) {
                columnToUpdate = key;
                break;
            }
        }

        if (!columnToUpdate) {
            return res.status(400).send('Pokémon not found in team');
        }

        await pool.query(
            `UPDATE teams SET ${columnToUpdate} = NULL WHERE user_id = $1`,
            [userId]
        );

        res.send('Pokémon removed from team');
    } catch (err) {
        console.error('Error removing Pokémon from team:', err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

