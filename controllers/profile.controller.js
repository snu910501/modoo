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
      } = req.body;

      const {
        userProfileImg,
        userBusinessLicense,
      } = req.files;

      await this.profileService.setProfile(
        userName,
        userCompanyTelNumber,
        userPhoneNumber,
        userCompanyName,
        userBusinessLocation,
        userProfileImg,
        userBusinessLicense,
      )
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProfileController;