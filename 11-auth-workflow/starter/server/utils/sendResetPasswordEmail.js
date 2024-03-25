const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({
  name,
  email,
  token,
  origin,
}) => {
  const subject = 'Reset your password';
  const html = `
    <h1>Reset you password</h1>
    <p>Hey, ${name}! Click this <a href="http://localhost:3000/user/reset-password?token=${token}&email=${email}">link</a> to reset your password.</p>
    `;

  return await sendEmail({ to: email, subject, html });
};

module.exports = sendResetPasswordEmail;
