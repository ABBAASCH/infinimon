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
        const result = await db.query('SELECT pokemon, id, hp_base, attack_base FROM pokemon');
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


router.get('/getteam', async (req, res) => {
    const userId = req.headers['user_id'];
    const result = await db.query('SELECT * FROM teams WHERE user_id = $1', [userId]);
    res.json(result.rows[0]);
});

router.get('/team', async (req, res) => {
    const userId = req.headers['user_id'];
    const result = await db.query('SELECT * FROM teams WHERE user_id = $1', [userId]);
    const pokemonIds = [
        result.rows[0].pokemon1_id,
        result.rows[0].pokemon2_id,
        result.rows[0].pokemon3_id,
        result.rows[0].pokemon4_id,
        result.rows[0].pokemon5_id,
        result.rows[0].pokemon6_id
    ];
    const pokemonDetails = await db.query('SELECT * FROM pokemon WHERE id = ANY($1)', [pokemonIds]);
    res.json(pokemonDetails.rows);
});

router.get('/randomteam', async (req, res) => {
    const result = await db.query('SELECT * FROM pokemon ORDER BY RANDOM() LIMIT 6');
    res.json(result.rows);
});

module.exports = router;

