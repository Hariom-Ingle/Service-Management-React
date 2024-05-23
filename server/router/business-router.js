const express = require("express");
const router = express.Router();
const businessController = require('../controller/business-controller');
 
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../client/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array('images', 10), businessController.businessForm);
router.get("/all", businessController.getAllBusinesses);
router.put('/upload/:id', upload.array('images', 10), businessController.updateBusiness);
router.delete('/delete/:id', businessController.deleteBusiness);

module.exports = router;
