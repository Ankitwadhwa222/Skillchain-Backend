const mongoose = require("mongoose");  

const portfolioSchema = mongoose.Schema({
     platform: {
          type: String,     
          required: true,
     },
     url: {
          type: String,
          required: true,
     },
})


module.exports = portfolioSchema;  