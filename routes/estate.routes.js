const express = require('express');
const router = express.Router();
const multer = require('multer');

const EstateController = require('../controllers/estate.controller');
const estateController = new EstateController();

const upload = multer({

  storage: multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "./uploads");
    // },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post('/', upload.array('images', 8), estateController.setEstate);

module.exports = router;