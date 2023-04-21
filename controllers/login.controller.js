const LoginService = require("../services/login.service");

class LoginController {
  loginService = new LoginService();

  login = async(req,res) => {
    try{
      const {
        userId,
        userPassword,
      } = req.body;


    } catch(err) {
      throw err;
    }
  };
};

module.exports = LoginController