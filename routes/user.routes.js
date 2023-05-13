const express = require('express');
const router = express.Router();

const {isLoggedIn} = require('../middlewares/auth');
const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/approved/:userId',isLoggedIn ,userController.approved);

module.exports = router;