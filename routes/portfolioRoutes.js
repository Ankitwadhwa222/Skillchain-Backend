const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.");
const {
  addPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
} = require("../controller/portfolioController");


router.post("/", protect, addPortfolio);
router.get("/", protect, getPortfolios);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);



module.exports = router;
     