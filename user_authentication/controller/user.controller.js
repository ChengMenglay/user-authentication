const db = require("../util/db");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var message = {};
    if (!email) {
      message.email = "Please fill in your email!";
    }
    if (!password) {
      message.password = "Please fill in your password!";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
      });
      return false;
    } else {
      const result = await db.query("SELECT * FROM userinfo WHERE email =?", [
        email,
      ]);
      if (result && result.length > 0) {
        hash = result[0].password;
        const compareHash = await bcrypt.compareSync(password, hash);
        if (!compareHash) {
          res.json({
            message: "Password Incorrect!",
          });
          return false;
        } else {
          delete result[0].password;
          res.json({
            message: "Login Success",
            data: result[0],
          });
        }
      } else {
        res.json({
          message: "Email doesn't exist!",
        });
        return false;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirm_password } = req.body;
    var message = {};
    if (!firstname) {
      message.firstname = "Please fill in your firstname!";
    }
    if (!lastname) {
      message.lastname = "Please fill in your lastname!";
    }
    if (!email) {
      message.email = "Please fill in your email!";
    }
    if (!password) {
      message.password = "Please fill in your password!";
    }
    if (!confirm_password) {
      message.confirm_password = "Please fill in your confirm_password!";
    }
    if (password !== confirm_password) {
      message.compare_password = "Password is not matching!";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
      });
      return false;
    } else {
      const passBcrypt = bcrypt.hashSync(password, 10);
      const result = await db.query(
        "INSERT INTO userinfo(firstname, lastname, email, password) VALUES(?,?,?,?)",
        [firstname, lastname, email, passBcrypt]
      );
      if (result.affectedRows > 0) {
        const respone = await db.query(
          "SELECT userinfo.firstname, userinfo.lastname FROM userinfo ORDER BY id DESC LIMIT 1"
        );
        if (respone && respone.length > 0) {
          res.json({
            message: "Get Success!",
            data: respone[0],
          });
        }
        res.json({
          message: "Sign up Success",
          data: result,
        });
      } else {
        res.json({
          message: "Fails in fetching api!",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, login };
