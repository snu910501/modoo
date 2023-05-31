const RealtorRepository = require('../repositories/realtor.repository');

class RealtorService {
  realtorRepository = new RealtorRepository();

  getRealtor = async(userId) => {
    try{

      const userInfo = await this.realtorRepository.getRealtor(userId);
      return userInfo;

    } catch(err) {
      throw err;
    }
  };
}

module.exports = RealtorService;