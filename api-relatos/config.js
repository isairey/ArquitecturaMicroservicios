const { Pool } = require('pg');
require("dotenv").config();

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DB = process.env.DB_NAME;
const PORT = process.env.DB_PORT;

let pool = null;

pool = new Pool({
    user : USER,
    password : PASS,
    host : HOST,
    database : DB,
    port : PORT,
    })

module.exports = { pool }