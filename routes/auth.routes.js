const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signUp.controller');
const signupController = new SignupController();

router.post('/', signupController.signup);

module.exports = router;