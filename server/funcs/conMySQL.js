const dotenv = require('dotenv');
dotenv.config();
const mySQL = require('mysql');

const conMySQL = mySQL.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

conMySQL.connect((err) => {
  if (err) {
    console.error('Error when connecting: ' + err);
    return -1;
  }
  console.log('Connected MYSQL');
});

module.exports = { conMySQL };
