const express = require('express');
const router = express.Router();

const {isLoggedIn, isAdmin} = require('../middlewares/auth');
const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/', isAdmin,isLoggedIn, userController.getUserList);
router.get('/approved/:userId',isLoggedIn ,userController.approved);

module.exports = router;