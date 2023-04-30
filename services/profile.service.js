const ProfileRepository = require('../repositories/profile.repository');
const uploadProfileToS3 = require("../modules/uploadProfileToS3");
const uploadLicenseToS3 = require('../modules/uploadLicenseToS3');

class ProfileService {
  profileRepository = new ProfileRepository();

  setProfile = async (
    userName,
    userCompanyTelNumber,
    userPhoneNumber,
    userCompanyName,
    userBusinessLocation,
    userProfileImg,
    userBusinessLicense
  ) => {
    try {
      //유효성 검사 할 게 있나?


      // AWS S3에다가 저장하는 로직
      const profileUrl = await uploadProfileToS3(userProfileImg);
      const licenseUrl = await uploadLicenseToS3(userBusinessLicense)

    } catch (err) {
      throw err;
    }
  };
}

module.exports = ProfileService;
