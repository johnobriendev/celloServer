const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.authenticateJWT = passport.authenticate('jwt', { session: false });


exports.sendVerificationEmail = async (user) => {
  const verificationToken = user.generateVerificationToken();
  await user.save();

  const verificationLink = `http://localhost5137/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify Your Account',
    html: `Please click <a href="${verificationLink}">here</a> to verify your account.`
  };

  await transporter.sendMail(mailOptions);
};

// exports.sendVerificationEmail = async (user) => {
//   const verificationToken = user.generateVerificationToken();

//   const verificationLink = `http://yourwebsite.com/verify/${verificationToken}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: user.email,
//     subject: 'Verify Your Account',
//     html: `Please click <a href="${verificationLink}">here</a> to verify your account.`
//   };

//   await transporter.sendMail(mailOptions);
// };