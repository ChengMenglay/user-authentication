const mysql = require("mysql");
const dotenv = require("dotenv");
const util = require("util");
dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL connected...");
  }
});

db.query = util.promisify(db.query).bind(db);

module.exports = db;
