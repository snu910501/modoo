const express = require('express');
const router = express.Router();
require('dotenv').config();

const MapController = require('../controllers/map.controller');
const mapController = new MapController();

router.post('/:userId', mapController.getMap)

module.exports = router;