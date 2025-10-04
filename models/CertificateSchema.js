const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, 
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  credentialId: { type: String },
  credentialUrl: { type: String },
  status: {
    type: String,
    enum: ['Not-Verified', 'In-Progress', 'Verified'],
    default: 'Not-Verified'
  },
  fileUploadURL: [{ type: String }], 
}, { timestamps: true }); 


module.exports = certificateSchema;
