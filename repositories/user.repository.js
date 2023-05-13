const User = require("../models/user");
const Error = require("../modules/errorHandler");

class userRepository {
  approved = async (userId) => {
    try {
      const user = await User.findOne({
        where: {
          userId: userId,
        },
        attributes : ['approved'],
        raw : true,
      });

      if (!user) {
        const error = new Error(501, "해당 user가 존재하지 않습니다.");
        throw error;
      };

      if (user.approved == 0) {
        await User.update(
          { approved: 1 },
          { where: { userId: userId } }
        );
    
      } else {
        await User.update(
          { approved: 0 },
          { where: { userId: userId } }
        );
      }

      return;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = userRepository;
