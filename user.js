const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a User schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,   // Ensure usernames are unique
    required: true, // Require the username field
    trim: true      // Trim leading and trailing whitespace
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;