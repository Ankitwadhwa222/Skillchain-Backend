const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.");
const {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require("../controller/skillController");


router.post("/", protect, addSkill);
router.get("/", protect, getSkills);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);



module.exports = router;
