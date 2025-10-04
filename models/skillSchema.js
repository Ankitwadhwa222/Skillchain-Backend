const mongoose  = require("mongoose")

const skillSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim : true,
  },
  // level: {
  //   type: String,
  //   enum: ["Beginner", "Intermediate", "Advanced", "Expert"],  
  //   required: true,
  // },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0,
    default: 0, 
  },
  category: {
    type: String,
    enum: [ "Frontend",
      "Backend",
      "DevOps",
      "Data Science & ML",
      "Tools & Frameworks",
      "Project Management",
      "Other"],
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },
  certification: {
    type : String,
     required : false,
  }
});

module.exports = skillSchema;
