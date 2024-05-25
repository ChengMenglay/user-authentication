const mysql = require("mysql2");
const dotenv = require("dotenv");
const util = require("util");
dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false, // Disable SSL certificate validation
  },
});

db.connect((error) => {
  if (error) {
    console.log("Error connecting to the database:", error);
  } else {
    console.log("MYSQL connected...");
  }
});

// If you want to use async/await with db.query
db.query = util.promisify(db.query).bind(db);

module.exports = db;
