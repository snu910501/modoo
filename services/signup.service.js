const SignupRepository = require('../repositories/signUp.repository');
const validate = require('../validations/signup.validate');

class SignupService {
  signupRepository = new SignupRepository();

  signup = async (userId,
    userPassword,
    userPasswordCheck,
    userName,
    userEmail,
    userPhoneNumber) => {
    try {
      validate.validateId(userId);
      validate.validatePw(userPassword, userPasswordCheck);

      return;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SignupService;