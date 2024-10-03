const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

// Handle contact form submissions
app.post('/send-email', (req, res) => {
  const { firstname, lastname, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'sarath.chandran.dev@gmail.com', // Your email address
    subject: `${subject} from ${firstname} ${lastname}`,
    text: `${message}\n\nContact Email: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: 'Error sending email' });
    }
    res.status(200).send({ success: true, message: 'Email sent successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running  succesfullton port ${PORT}`);
});
