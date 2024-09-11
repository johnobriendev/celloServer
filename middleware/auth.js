const { Resend } = require('resend');
const passport = require('passport');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.authenticateJWT = passport.authenticate('jwt', { session: false });

exports.sendVerificationEmail = async (user) => {
  const verificationToken = user.generateVerificationToken();

  const verificationLink = `http://yourwebsite.com/verify/${verificationToken}`;

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Use the email you verified with Resend
      to: user.email,
      subject: 'Verify Your Account',
      html: `Please click <a href="${verificationLink}">here</a> to verify your account.`
    });

    console.log('Verification email sent successfully. Returned data:', data);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};


// const passport = require('passport');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   // Configure your email service here
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// exports.authenticateJWT = passport.authenticate('jwt', { session: false });

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