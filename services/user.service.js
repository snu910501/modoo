const UserRepository = require('../repositories/user.repository');

class UserService {
  userRepository = new UserRepository();

  approved = async(userId) => {
    try{
      await this.userRepository.approved(userId);
      return ;

    } catch(err) {
      throw err;
    }
  }
}

module.exports = UserService;
