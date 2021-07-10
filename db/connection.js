const mysql = require('mysql2');

require('dotenv').config({ path: '/.env'});
const password = process.env.PASSWORD;

// CONNECT TO DATABASE
const db = mysql.createConnection(
{
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Salemcaiman1619!',
  database: 'emp_db'
});

db.connect(function(err) {
  if (err)
  throw err
});


module.exports = db;