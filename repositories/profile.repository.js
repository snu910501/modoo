const User = require("../models/user");

class ProfileRepository {
  setProfile = async (
    userId,
    userName,
    userCompanyTelNumber,
    userPhoneNumber,
    userCompanyName,
    userBusinessLocation,
    profileUrl,
    licenseUrl,
    startLocation,
    startLocationLat,
    startLocationLng,
  ) => {
    try {
      await User.update(
        {
          userName: userName,
          userCompanyTelNumber: userCompanyTelNumber,
          userPhoneNumber: userPhoneNumber,
          userCompanyName: userCompanyName,
          userBusinessLocation: userBusinessLocation,
          userProfileImgUrl: profileUrl,
          userBusinessLicenseImgUrl: licenseUrl,
          startLocation: startLocation,
          startLocationLat: startLocationLat,
          startLocationLng: startLocationLng,
        },
        {
          where: { userId: userId },
        }
      );

      return;

    } catch (err) {
      throw err;
    }
  };

  getProfile = async (userId) => {
    try {
      const user = await User.findOne({
        where: { userId },
        attributes: [
          "userId",
          "userName",
          "userEmail",
          "userPhoneNumber",
          "userCompanyName",
          "userBusinessLocation",
          "userBusinessLicenseImgUrl",
          "userProfileImgUrl",
          "userCompanyTelNumber",
          "startLocation",
        ],
      });

      return user;
    } catch (err) {
      throw err;
    }
  };

  getProfileUrl = async (userId) => {
    try {
      const profileUrl = await User.findOne({
        where: {
          userId: userId
        },
        raw: true,
        attributes: ['userProfileImgUrl']
      })

      return profileUrl[0]
    } catch (err) {
      throw err;
    }
  };
  getLicenseUrl = async (userId) => {
    try {
      const licenseUrl = await User.findOne({
        where: {
          userId: userId
        },
        raw: true,
        attributes: ['userBusinessLicenseImgUrl']
      })

      return licenseUrl[0]
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProfileRepository;
