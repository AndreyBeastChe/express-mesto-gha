const mongoose = require('mongoose');

const { reg } = require('../constants');

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
      validator: (value) => reg.test(value),
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('card', cardSchema);
