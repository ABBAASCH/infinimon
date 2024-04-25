const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'infinimon'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};