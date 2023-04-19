const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');

router.use('/signup', authRouter);

module.exports = router;