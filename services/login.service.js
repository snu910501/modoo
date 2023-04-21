const LoginRepository = require('../repositories/login.repository');

class LoginService{
  loginRepository = new LoginRepository();
  login = async(userId, userPassword) => {
    try{

      if (userId == "hello") {
        const error = new Error("에러 테스트ㅋㅋㅋ", 401);
        throw error;
      };

    } catch(err) {
      throw(err);
    }
  }
};

module.exports = LoginService;