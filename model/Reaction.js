const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  // Define the schema fields for the Reaction model
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (value) => dateFormat(value),
  },
});

module.exports = mongoose.model('Reaction', reactionSchema);