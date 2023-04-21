const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const loginRouter = require("./login.routes");

router.use('/signup', authRouter);
// router.use('/login', loginRouter);

module.exports = router;