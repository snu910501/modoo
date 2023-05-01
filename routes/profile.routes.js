const express = require("express");
const multer = require("multer");
const iconv = require('iconv-lite');
const router = express.Router();

const ProfileController = require('../controllers/profile.controller');
const profileController = new ProfileController();

const upload = multer({
  storage: multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "./uploads");
    // },
    filename: function (req, file, cb) {
      const decodedFilename = iconv.decode(file.originalname, 'utf-8');
      console.log('iconv', decodedFilename);
      cb(null, decodedFilename);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post(
  "/",
  upload.fields([
    { name: "userProfileImg", maxCount: 1 },
    { name: "userBusinessLicense", maxCount: 1 },
  ]), profileController.setProfile
);

router.get('/', profileController.getProfile)

module.exports = router;