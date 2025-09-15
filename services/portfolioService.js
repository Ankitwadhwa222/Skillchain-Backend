const User = require("../models/User");

 

const addPortfolio = async (_id, platform, url) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");

  const newPortfolio = { platform, url };

  const alreadyExists = user.portfolioLinks.some(
    (p) => p.platform === platform && p.url === url
  );
  if (alreadyExists) {
    throw new Error("Portfolio link already added");
  }

  if (!user.portfolioLinks) user.portfolioLinks = [];

   user.portfolioLinks.push(newPortfolio);

  await user.save();
  return newPortfolio;
};


const getPortfolios = async (_id) => {
  const user = await User.findById(_id);
  if (!user) throw new Error("User not found");

  return user.portfolioLinks || []; // ✅ fixed field name
};

const updatePortfolio = async (id, platform, url) => {
  const user = await User.findOne({ "portfolioLinks._id": id });
  if (!user) throw new Error("Portfolio link not found");

  const portfolio = user.portfolioLinks.id(id);
  portfolio.platform = platform;
  portfolio.url = url;

  await user.save();
  return portfolio;
};
const deletePortfolio = async (id) => {
  // Find the user containing the portfolio link
  const user = await User.findOne({ "portfolioLinks._id": id });
  if (!user) throw new Error("Portfolio link not found");

  const link = user.portfolioLinks.id(id);
  if (!link) throw new Error("Portfolio link not found");

  // ✅ Use deleteOne instead of remove
  link.deleteOne();
  await user.save();

  return { success: true, message: "Portfolio link deleted successfully" };
};


module.exports = {
  addPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,    
};
