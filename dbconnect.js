var mysql = require('mysql2');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mobile_store"
});

conn.connect(function (err) {
  if (err) console.log(err);
  console.log("Connected!");
});

module.exports = conn;