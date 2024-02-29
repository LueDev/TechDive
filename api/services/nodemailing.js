const nodemailer = require('nodemailer');

const sendEmail = async (subject, to, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: `noreply.elquipe@gmail.com`,
                pass: `lltg jkni cduh vtmz`,
            }
        });

        const info = await transporter.sendMail({
            from: 'NOREPLY <noreply.elquipe@gmail.com>',
            to: to,
            subject: subject,
            html: htmlContent
        });

        console.log(`${subject} email sent successfully.`);
        return info.messageId;
    } catch (error) {
        console.error(`Error sending ${subject} email:`, error);
        throw error;
    }
};

const sendForgotPasswordEmail = async (userEmail) => {
    const emailSubject = 'Forgot Password';
    const emailContent = `<p>Please reset your password <a href="${process.env.REACT_LOCALSERVER}/reset">here</a></p>`;

    await sendEmail(emailSubject, userEmail, emailContent);
};

const sendRegistrationEmail = async (userEmail) => {
    const emailSubject = 'Welcome to Our Website';
    const emailContent = '<p>Your registration email content here.</p>';

    await sendEmail(emailSubject, userEmail, emailContent);
};

module.exports = {
    sendForgotPasswordEmail,
    sendRegistrationEmail
};
