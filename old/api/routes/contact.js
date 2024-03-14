const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Get form data from request body
    const { name, email, message } = req.body;

    // Email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient@example.com',
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Response to the client
    res.status(200).json({
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
