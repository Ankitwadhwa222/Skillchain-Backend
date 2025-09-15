const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
} = require("../controller/certificationController");


router.post("/", protect, addCertification);
router.get("/", protect, getCertifications);
router.put("/:id", protect, updateCertification);
router.delete("/:id", protect, deleteCertification);



module.exports = router;
     