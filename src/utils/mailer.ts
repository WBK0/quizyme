const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@codebybartlomiej.pl',
      pass: process.env.NODEMAILER_PASSWORD
    },
  })
);

export default transporter;