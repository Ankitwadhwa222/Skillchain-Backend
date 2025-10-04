const mongoose = require('mongoose');
const learningPathSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Skill name is required"], // This might be causing the error
  },
  reason: {
    type: String,
    required: [true, "Reason is required"],
  },
  category: {
    type: String,
    default: 'General'
  },
  addedAt: {
    type: Date,
    default: Date.now,
  }
});
  
module.exports = learningPathSchema;