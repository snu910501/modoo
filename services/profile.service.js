const ProfileRepository = require('../repositories/profile.repository');
const uploadProfileToS3 = require("../modules/uploadProfileToS3");
const uploadLicenseToS3 = require('../modules/uploadLicenseToS3');

class ProfileService {
  profileRepository = new ProfileRepository();

  setProfile = async (
    userId,
    userName,
    userCompanyTelNumber,
    userPhoneNumber,
    userCompanyName,
    userBusinessLocation,
    userProfileImg,
    userBusinessLicense
  ) => {
    try {
      //유효성 검사
      // 로그인한 유저가 다른 유저의 정보를 변경하려는 시도 감지


      // AWS S3에다가 저장하는 로직
      const profileUrl = await uploadProfileToS3(userProfileImg);
      const licenseUrl = await uploadLicenseToS3(userBusinessLicense);

      console.log('profileUrl', profileUrl, licenseUrl);

      await this.profileRepository.setProfile(
        userId,
        userName,
        userCompanyTelNumber,
        userPhoneNumber,
        userCompanyName,
        userBusinessLocation,
        profileUrl,
        licenseUrl
      )
      return;

    } catch (err) {
      throw err;
    }
  };

  getProfile = async (userId) => {
    try {
      // 로그인한 유저가 다른 유저의 정보를 가져오려는 행위 감지 유효성검사

      const user = this.profileRepository.getProfile(userId);

      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProfileService;