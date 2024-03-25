const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({to,subject,html}) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport(nodemailerConfig);

    return await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to,
        subject,
        html
    })
}

module.exports = sendEmail;