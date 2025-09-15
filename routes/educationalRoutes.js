const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addEducation,
  getEducations,
  updateEducation,
  deleteEducation,
} = require("../controller/educationController");


router.post("/", protect, addEducation);
router.get("/", protect, getEducations);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);



module.exports = router;
     