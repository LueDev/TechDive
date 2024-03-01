const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const templateSource = fs.readFileSync('./HTML/forgotpassword.hbs', 'utf8');

const template = handlebars.compile(templateSource);

const data = {
  // Data properties to replace placeholders in the template
  // Example: name: 'John Doe'
};

// Replace placeholders in the template with actual data
const htmlToSend = template(data);

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure transporter settings (e.g., SMTP details)
});

// Define email options
const mailOptions = {
  from: 'your@example.com',
  to: 'sonderenergy@gmail.com',
  subject: 'Your Subject',
  html: htmlToSend // Use the compiled HTML content
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
