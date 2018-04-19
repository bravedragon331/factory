var mysql    = require('mysql');

var dbconfig = require('../config/database');

// Script for setting up database and tables
var conn = mysql.createConnection(dbconfig.connection);

conn.query('CREATE DATABASE ' + dbconfig.database);

console.log('Success! Database created.');
conn.end();
