const SignupService = require("../services/signup.service");

class SignupController {
  signupService = new SignupService();

  signup = async (req, res, next) => {
    try {
      const {
        userId,
        userPassword,
        userPasswordCheck,
        userName,
        userEmail,
        userPhoneNumber,
      } = req.body;
      
      await this.signupService.signup(
        userId,
        userPassword,
        userPasswordCheck,
        userName,
        userEmail,
        userPhoneNumber,);

      return res.status(200).json({ message: '회원가입 성공' })
    } catch (err) {
      next(err);
    }
  };
}

module.exports = SignupController;
