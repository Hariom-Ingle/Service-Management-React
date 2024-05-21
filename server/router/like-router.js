// router/like-router.js
const express = require("express");
const router = express.Router();
const likeController = require("../controller/like-controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/like", authMiddleware, likeController.likeService);
router.get("/liked", authMiddleware, likeController.getLikedServices);

module.exports = router;
