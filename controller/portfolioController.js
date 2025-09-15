const portfolioService = require("../services/portfolioService");

const addPortfolio = async (req, res) => {
  const { platform, url } = req.body;

  if (!platform || !url) {
    return res.status(400).json({ error: "Platform and URL are required" });
  }

  try {
    const newPortfolio = await portfolioService.addPortfolio(
      req.user._id,
      platform,
      url
    );

    res.status(201).json({
      message: "Portfolio link added successfully",
      portfolio: newPortfolio,
    });
  } catch (error) {   
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getPortfolios = async (req, res) => {
  try {
    const portfolioLinks = await portfolioService.getPortfolios(req.user._id);

    res.status(200).json({
      message: "Fetched portfolio links successfully",
      portfolioLinks, // ✅ consistent with schema
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { platform, url } = req.body;

  if (!platform || !url) {
    return res.status(400).json({ error: "Platform and URL are required" });
  }

  try {
    const updatedPortfolio = await portfolioService.updatePortfolio(
      id,
      platform,
      url
    );

    res.status(200).json({
      message: "Portfolio link updated successfully",
      portfolio: updatedPortfolio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await portfolioService.deletePortfolio(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting portfolio link:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
};
