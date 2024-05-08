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

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
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

module.exports = router;
