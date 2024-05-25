const express = require("express");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config({ path: "./.env" });
const cors = require("cors");
app.use(cors());
app.listen( parseInt(process.env.PORT)
);

const user = require("./router/user.router");
user(app);
