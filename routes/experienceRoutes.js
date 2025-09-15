const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} = require("../controller/experienceController");


router.post("/", protect, addExperience);
router.get("/", protect, getExperiences);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);



module.exports = router;
     