import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
});

app.listen(3000, () => console.log('Server running'));
