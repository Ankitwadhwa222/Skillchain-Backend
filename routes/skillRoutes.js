const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,

  addToLearningSkill,
  getLearningPath,
  deleteLearning

} = require("../controller/skillController");


router.post("/", protect, addSkill);
router.get("/", protect, getSkills);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);


router.post("/addToLearning", protect, addToLearningSkill);
router.get("/addToLearning", protect, getLearningPath);
router.delete("/addToLearning/:id", protect, deleteLearning);


module.exports = router;
