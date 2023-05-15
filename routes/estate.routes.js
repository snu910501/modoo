const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isLoggedIn, isApproved } = require("../middlewares/auth");

const EstateController = require('../controllers/estate.controller');
const estateController = new EstateController();

const upload = multer({

  storage: multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "./uploads");
    // },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post('/',isApproved ,isLoggedIn, upload.array('images', 8), estateController.setEstate);
router.get('/list',isApproved ,isLoggedIn, estateController.getEstateList);
router.get('/map/:userId', estateController.getUserEstate);
router.delete("/:estateId", isApproved,isLoggedIn, estateController.deleteEstate);
router.get('/:estateId', isApproved,isLoggedIn, estateController.getEstate);

module.exports = router;