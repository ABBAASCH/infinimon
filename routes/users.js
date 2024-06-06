var express = require('express');
var router = express.Router();
const db = require('../db.js');
const bcrypt = require('bcrypt');

function checkAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/users/login');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', (req, res) => {
    const error = req.query.error;
    res.render('login.html', { error: error });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user.id;
            return res.redirect('/users/profile?username=' + username);
        }
        res.redirect('/users/login?error=Invalid credentials');
    } catch (error) {
        console.error(error);
        res.redirect('/users/login?error=Database error');
    }
});

router.get('/register', (req, res) => {
    res.render('register.html');
});


// User registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userResult = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [username, hashedPassword]
        );

        const userId = userResult.rows[0].id;

        // Initialize an empty team for the new user
        await db.query(
            'INSERT INTO teams (user_id, pokemon1_id, pokemon2_id, pokemon3_id, pokemon4_id, pokemon5_id, pokemon6_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', // Generate random numbers from 1 to 1214
            [userId
            , Math.floor(Math.random() * 1210) + 1
            , Math.floor(Math.random() * 1210) + 1
            , Math.floor(Math.random() * 1210) + 1
            , Math.floor(Math.random() * 1210) + 1
            , Math.floor(Math.random() * 1210) + 1
            , Math.floor(Math.random() * 1210) + 1]
        );

        res.redirect('/users/login');
    } catch (error) {
        console.error(error);
        res.redirect('/users/register?error=Registration failed');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/users/login');
    });
});

router.get('/profile', checkAuthenticated, (req, res) => {
    const username = req.query.username;
    const userId = req.session.userId;
    res.render('profile.html', { username: username, userId: userId });
});

router.get('/battle', checkAuthenticated, async (req, res) => {
    const userId = req.session.userId;
    res.render('battle.html', { userId: userId });
});

module.exports = router;
