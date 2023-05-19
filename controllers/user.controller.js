const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  getUserList = async(req,res,next) => {
    try{
      const userList = await this.userService.getUserList();
      return res.status(200).json({userList : userList});
    } catch(err) {
      next(err);
    }
  };

  approved = async(req,res,next) => {
    try{
      const {userId} = req.params;
  
      await this.userService.approved(userId);
      return res.status(200).json({message : '회원 승인정보가 변경되었습니다.'})
    } catch(err) {
      next(err);
    }
  };

}

module.exports = UserController;