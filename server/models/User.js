const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    username: {
      type: String,
      unique: 1, // Unique name for future use.
    },
    country: {
      type: String,
    },
    device: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    lastActive: {
      type: Number,
    },
    totalActive: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
