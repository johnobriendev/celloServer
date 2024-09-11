// const mongoose = require('mongoose');
// const crypto = require('crypto');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   active: { type: Boolean, default: false },
//   verificationToken: String,
// });

// userSchema.methods.generateVerificationToken = function() {
//   this.verificationToken = crypto.randomBytes(64).toString('hex');
//   return this.verificationToken;
// };

// module.exports = mongoose.model('User', userSchema);

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