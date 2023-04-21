const LoginService = require("../services/login.service");
const Error = require('../modules/errorHandler');

class LoginController {
  loginService = new LoginService();

  login = async(req,res,next) => {
    try{
      const {
        userId,
        userPassword,
      } = req.body

      await this.loginService.login(userId,userPassword);

      return res.status(200).json({message : '로그인 성공'});
    } catch(err) {
      console.log('실행됩니다',err);
      next(err);
    }
  };
};

module.exports = LoginController