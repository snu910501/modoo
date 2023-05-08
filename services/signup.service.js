const SignupRepository = require('../repositories/signup.repository');
const validate = require('../validations/signup.validate');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
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
      const saltRounds = 12;
      const userKey = uuid.v4();

      validate.validateId(userId);
      validate.validatePw(userPassword, userPasswordCheck);
      console.log('hihi useKEy', userKey);
      const hasedUserPassword = await bcrypt.hash(userPassword,saltRounds);
      userPassword = hasedUserPassword;
      const user = await this.signupRepository.findUser(userId);
      if (user) {
        throw new Error('아이디가 중복됩니다.', 401);
      } else {
        await this.signupRepository.signup(
          userId,
          userPassword,
          userName,
          userEmail,
          userPhoneNumber,
          userKey,
        )
        return;
      }
    } catch (err) {
      throw(err);
    }
  }
}

module.exports = SignupService;