const mongoose = require('mongoose');

const reg = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;

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
  likes: { type: Array, default: [], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('card', cardSchema);
