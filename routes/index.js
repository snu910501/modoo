const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const loginRouter = require("./login.routes");
const profileRouter = require('./profile.routes');

router.use('/signup', authRouter);
router.use('/login', loginRouter);
router.use('/profile', profileRouter);

module.exports = router;