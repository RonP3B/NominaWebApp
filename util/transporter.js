const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "nominaappitla@gmail.com",
    pass: process.env.TRANSPORTER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
