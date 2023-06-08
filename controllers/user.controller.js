const UserService = require('../services/user.service');

//관리자가 중개사들 리스트 볼 때 사용되는 API입니다.
class UserController {
  userService = new UserService();

  getUserList = async(req,res,next) => {
    try{
      const userList = await this.userService.getUserList();
      return res.status(200).json({userList : userList});
    } catch(err) {
      next(err);
    };
  };

  approved = async(req,res,next) => {
    try{
      const {userId} = req.params;
  
      await this.userService.approved(userId);
      return res.status(200).json({message : '회원 승인정보가 변경되었습니다.'})
    } catch(err) {
      next(err);
    };
  };

}

module.exports = UserController;