const mysql = require("mysql2");
require("dotenv").config();

user = "admin";
password = "*Semi1_Practica1*";
host = "bdpractica1.cp842gwg2jsl.us-east-1.rds.amazonaws.com";
database = "BDSemiPractica2";
port = "3306";

const conn = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  database: database,
  password: password,

  multipleStatements: true,
});

conn.connect(function (err) {
  if (err) {
    console.log("Database connection error: " + err.stack);
    return;
  }
  console.log("Database connected successfully.");
});

module.exports = conn;
