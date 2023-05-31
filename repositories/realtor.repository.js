const User = require('../models/user');

class RealtorRepository {
  getRealtor = async(userId) => {
    try {

      const userInfo = await User.findOne({
        where : {
          userId : userId
        },
        raw : true,
      });

      return userInfo;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = RealtorRepository;