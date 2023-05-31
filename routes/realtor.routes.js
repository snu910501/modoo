const express = require('express');
const router = express.Router();

const RealtorController = require('../controllers/realtor.controller');
const realtorController = new RealtorController();

router.get('/:userId', realtorController.getRealtor);

module.exports = router;