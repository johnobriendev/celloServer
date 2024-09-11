const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
});

userSchema.methods.generateVerificationToken = function() {
  const token = bcrypt.genSaltSync(10);
  this.verificationToken = token;
  this.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;