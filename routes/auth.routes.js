const express = require('express');
const router = express.Router();
const multer = require('multer');

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

const upload = multer({
    storage: multer.diskStorage({
      // destination: function (req, file, cb) {
      //   cb(null, "./uploads");
      // },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
  });

router.post('/', upload.array('images',5),signupController.signup);

module.exports = router;