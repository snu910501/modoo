const RealtorService = require('../services/realtor.service');

class RealtorController {
  realtorServcie = new RealtorService();

  getRealtor = async(req,res,next) => {
    try{
      const {userId} = req.params;

      const userInfo = await this.realtorServcie.getRealtor(userId);
      return userInfo;

    } catch(err) {
      throw next(err);
    }
  }
}

module.exports = RealtorController;