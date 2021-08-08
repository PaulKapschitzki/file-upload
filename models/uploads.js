const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  }
  // ,
  // fileUpload: {
  //   type: Object,
  //   required: false
  // }
});

module.exports = mongoose.model('uploads', uploadSchema);