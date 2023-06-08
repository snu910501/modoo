const ProfileService = require('../services/profile.service');

class ProfileController {
  profileService = new ProfileService();

  setProfile = async (req, res, next) => {
    try {
      const {
        userName,
        userCompanyTelNumber,
        userPhoneNumber,
        userCompanyName,
        userBusinessLocation,
        startLocation,
      } = req.body;

      const {
        userProfileImg,
        userBusinessLicense,
      } = req.files;

      const userId = res.locals.userId;

      await this.profileService.setProfile(
        userId,
        userName,
        userCompanyTelNumber,
        userPhoneNumber,
        userCompanyName,
        userBusinessLocation,
        userProfileImg,
        userBusinessLicense,
        startLocation,
        );

      return res.status(200).json({ message: '정보를 수정하였습니다.' })
    } catch (err) {
      next(err);
    }
  }

  getProfile = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const user = await this.profileService.getProfile(userId);

      return res.status(200).json({ user })
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ProfileController;