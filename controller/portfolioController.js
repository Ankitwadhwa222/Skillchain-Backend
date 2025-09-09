const portfolioService = require("../services/portfolioService");

const addPortfolio = async (req, res) => {
  const { title, description, link, technologies } = req.body;
  try {
     const newPortfolio = await portfolioService.addPortfolio(
          req.user._id,
          title,
          description,
          link,
          technologies
     );
     console.log(newPortfolio);
     res.status(201).json(newPortfolio);
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
}
};