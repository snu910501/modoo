const LoginService = require("../services/login.service");
const Error = require('../modules/errorHandler');

class LoginController {
  loginService = new LoginService();
};

module.exports = LoginController