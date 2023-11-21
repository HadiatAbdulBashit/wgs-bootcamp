const pg = require('pg');
const { Pool } = pg;
const util = require('util');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'contact-app',
    password: 'admin',
    port: 5432,
})

exports.query = util.promisify(pool.query).bind(pool)