import nodemailer from 'nodemailer';
import express, { Request, Response } from 'express';
require('dotenv').config();

const router = express.Router();

router.post('/contact', (req: Request, res: Response) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: `Message from ${req.body.email}, Name: ${req.body.name}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
      res.status(500).send('error');
    }
    
    console.log('Email sent:' + info.response);
    res.send('Success');

  })
})

module.exports = router;
