const mysql = require('mysql2');



require('dotenv').config({ path: '/.env'});
const password = process.env.PASSWORD;

// CONNECT TO DATABASE
// const db = mysql.createConnection(
// {
//   host: 'localhost',
//   user: 'root',
//   password: 'Salemcaiman1619!',
//   database: 'emp_db'
// });


const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});


module.exports = db;