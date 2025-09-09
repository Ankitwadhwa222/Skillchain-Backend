const User = require("../models/User");

 
const addPortfolio = async (_id , title , description , link , technologies) => {
     const user = await User.findById(_id);
     // console.log(user);
     if(!user) throw new Error("User not found");

     const newPortfolio = {
          title,
          description,
          link,
          technologies
     }
     user.portfolios.push(newPortfolio);

     await user.save();
     return newPortfolio;
};

module.exports = {
    addPortfolio
};