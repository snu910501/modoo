const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const loginRouter = require("./login.routes");
const profileRouter = require('./profile.routes');
const estateRouter = require('./estate.routes');
const mapRouter = require('./map.routes');
const userRouter = require('./user.routes');

router.use('/signup', authRouter);
router.use('/login', loginRouter);
router.use('/profile', profileRouter);
router.use('/estate', estateRouter);
router.use('/user',userRouter);
router.use('/map', mapRouter);


module.exports = router;