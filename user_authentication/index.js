const express = require("express");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config({ path: "./.env" });
const cors = require("cors");
app.use(cors());
app.listen(8080, () => {
  console.log("Server Started on Port " + 8080);
});

const user = require("./router/user.router");
user(app);
