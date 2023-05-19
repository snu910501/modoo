const UserRepository = require('../repositories/user.repository');

class UserService {
  userRepository = new UserRepository();

  getUserList = async() => {
    try{
      const userList = await this.userRepository.getUserList();
      
      return userList;
    } catch(err) {
      throw err;
    }
  }

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
