const { Pool } = require('pg');

const pool = new Pool({
    user: 'theisbaasch',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'infinimon'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
