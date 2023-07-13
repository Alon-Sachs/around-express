const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(w{3}\.)?.+\..+(\/.*)?/gm.test(v),
      message: 'Link validation failed',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
