const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(w{3}\.)?.+\..+(\/.*)?/gm.test(v),
      message: 'Link validation failed',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      default: [],
    },
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
