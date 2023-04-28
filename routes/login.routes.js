const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET)
    return res.status(200).json({ token })
  })(req, res, next);
});

module.exports = router;