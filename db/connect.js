const mysql = require('mysql2');

require('dotenv').config();
const password = process.env.PASSWORD;

// CONNECT TO DATABASE
const db = mysql.createConnection(
{
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'emp_db'
});




module.exports = db;