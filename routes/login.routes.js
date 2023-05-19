const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const multer = require('multer');
const env = require('dotenv');

const {isLoggedIn} = require('../middlewares/auth');

env.config();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

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

router.post('/', upload.array('images', 1), (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }
    const token = jwt.sign({ userId: user.userId, approved : user.approved, admin : user.admin }, process.env.JWT_SECRET)
    return res.status(200).json({ token: token, userKey : user.userKey, approved : user.approved, admin : user.admin, userId: user.userId })
  })(req, res, next);
});

module.exports = router;