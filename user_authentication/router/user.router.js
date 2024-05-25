const controller = require("../controller/user.controller");

const user = (app) => {
  app.post("/api/signup", controller.signup);
  app.post("/api/login", controller.login);
};

module.exports = user;
