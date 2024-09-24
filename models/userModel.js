const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [30, 'Name must be at most 30 characters long'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'Passwords do not match',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
