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
        const result = await db.query('SELECT pokemon FROM pokemon');
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

module.exports = router;

