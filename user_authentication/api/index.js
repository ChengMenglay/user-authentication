const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.listen(8080, () => {
  console.log("Server Started on Port 8080");
});

const user = require("../router/user.router");
user(app);
