// emailService.js
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const handlebars = require('handlebars');

// Function to read the Handlebars template file
const readTemplateFile = async (filePath) => {
    try {
        const templateContent = await fs.readFile(filePath, 'utf8');
        return handlebars.compile(templateContent);
    } catch (error) {
        console.error('Error reading template file:', error);
        throw error;
    }
};

// Function to send email using Nodemailer with Handlebars template
const sendEmailWithTemplate = async (subject, to, templatePath, data) => {
    try {
        // Read the template file
        const compileTemplate = await readTemplateFile(templatePath);
        // Compile the template with dynamic data
        const htmlContent = compileTemplate(data);

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_password'
            }
        });

        // Send mail with compiled HTML template
        const info = await transporter.sendMail({
            from: 'NOREPLY <noreply@example.com>',
            to: to,
            subject: subject,
            html: htmlContent
        });

        console.log('Message sent: ', info.messageId);
        return info.messageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Function to send forgot password email
const sendForgotPasswordEmail = async (userEmail) => {
    const emailSubject = 'Forgot Password';
    const templatePath = '/path/to/forgot-password-template.hbs'; // Path to your forgot password email template
    const templateData = {
        subject: 'Forgot Password',
        // Include any additional dynamic data needed for the template
    };

    try {
        await sendEmailWithTemplate(emailSubject, userEmail, templatePath, templateData);
        console.log('Forgot password email sent successfully.');
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        throw error;
    }
};

// Function to send registration email
const sendRegistrationEmail = async (userEmail) => {
    const emailSubject = 'Welcome to Our Website';
    const templatePath = '/path/to/register-template.hbs'; // Path to your registration email template
    const templateData = {
        subject: 'Welcome to Our Website',
        // Include any additional dynamic data needed for the template
    };

    try {
        await sendEmailWithTemplate(emailSubject, userEmail, templatePath, templateData);
        console.log('Registration email sent successfully.');
    } catch (error) {
        console.error('Error sending registration email:', error);
        throw error;
    }
};

module.exports = {
    sendEmailWithTemplate,
    sendForgotPasswordEmail,
    sendRegistrationEmail
};
