const Error = require('../modules/errorHandler')

exports.validatePw = (userPassword, userPasswordCheck) => {
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,16})/;
  try {
    if (!passwordRegExp.test(userPassword)) {
      throw new Error(`비밀번호의 길이는 8~16자리 영문과 숫자의 조합입니다.`, 401);
    }
    if (userPassword != userPasswordCheck) {
      throw new Error(`비밀번호가 일치하지 않습니다.`, 401);
    }
    if (userPassword.length < 8 || userPassword.length > 16) {
      throw new Error(`비밀번호의 길이는 8~16자리 영문과 숫자의 조합입니다.`, 401)
    }
    return;
  } catch (err) {
    throw err;
  }
}

exports.validateId = (userId) => {
  const usernameRegExp = /^[A-Za-z0-9]{6,16}$/;
  try {
    if (!usernameRegExp.test(userId)) {
      throw new Error('아이디가 조건에 맞지 않습니다.', 401);
    }
    return;
  } catch (err) {
    throw err;
  }

}