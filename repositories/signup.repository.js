const User = require("../models/user")

class SignUpRepository {
  signup = async (
    userId,
    userPassword,
    userName,
    userEmail,
    userPhoneNumber,
    userKey
  ) => {
    try {
      const approved = false;
      const user = await User.create({
        userId,
        userPassword,
        userName,
        userEmail,
        userPhoneNumber,
        userKey,
        approved : approved,
      });

      return user;
    } catch (err) {
      throw err;s
    }
  };

  findUser = async (userId) => {
    try {
      const user = await User.findOne({
        where: { userId },
      });
      return user;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = SignUpRepository;