const SignupRepository = require('../repositories/signUp.repository');
const validate = require('../validations/signup.validate');
const Error = require('../modules/errorHandler');

class SignupService {
  signupRepository = new SignupRepository();

  signup = async (
    userId,
    userPassword,
    userPasswordCheck,
    userName,
    userEmail,
    userPhoneNumber
  ) => {
    try {
      validate.validateId(userId);
      validate.validatePw(userPassword, userPasswordCheck);

      const user = await this.signupRepository.findUser(userId);
      if (user) {
        throw new Error('아이디가 중복됩니다.', 401);
      } else {
        await this.signupRepository.signup(
          userId,
          userPassword,
          userPasswordCheck,
          userName,
          userEmail,
          userPhoneNumber
        )
        return;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SignupService;