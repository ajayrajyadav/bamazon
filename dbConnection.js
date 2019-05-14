require("dotenv").config();
const mysql = require('mysql');
// const dbConfig = {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'root',
//   database: 'greatBay_db'
// };

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
}


function query(queryString, queryParams, callback) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query(queryString, queryParams, function(error, data) {
    callback(error, data);
    connection.end(function(error) {
      console.log('Connection closed');
    });
  });
}

module.exports = {
  query: query
};
