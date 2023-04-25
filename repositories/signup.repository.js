const User = require("../models/user")

class SignUpRepository {
  signup = async (
    userId,
    userPassword,
    userName,
    userEmail,
    userPhoneNumber
  ) => {
    try {
      const user = await User.create({
        userId,
        userPassword,
        userName,
        userEmail,
        userPhoneNumber,
      });

      return user;
    } catch (err) {
      throw err;
    }
  };

  findUser = async (userId) => {
    try {
      const user = await User.findOne({
        where: { userId },
      });
      return user;
    } catch (err) {
      throw(err);
    }
  };
}

module.exports = SignUpRepository;