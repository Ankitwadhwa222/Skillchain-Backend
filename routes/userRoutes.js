const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware.");
const {getMe , updateMe , updateUserStatus} = require("../controller/userController")

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.patch("/me/status", protect, updateUserStatus);

module.exports = router;