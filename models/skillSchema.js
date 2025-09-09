const mongoose  = require("mongoose")

const skillSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],  
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = skillSchema;
