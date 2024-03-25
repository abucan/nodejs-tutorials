const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({name, email, verificationToken, origin }) => {
    const subject = 'Please verify your email';
    const html = `
    <h1>Verify your email</h1>
    <p>Hey, ${name}! Click this <a href="http://localhost:3000/user/verify-email?token=${verificationToken}&email=${email}">link</a> to verify your email.</p>
    `;

    return await sendEmail({ to: email, subject, html });
}

module.exports = sendVerificationEmail;