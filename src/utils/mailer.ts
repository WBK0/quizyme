const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@codebybartlomiej.pl', // tutaj wpisz swój adres email
      pass: 'cf9de01f1', // tutaj wpisz swoje hasło do konta email
    },
  })
);

export default transporter;