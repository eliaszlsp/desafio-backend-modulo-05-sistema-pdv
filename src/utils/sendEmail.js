const dotenv = require("dotenv");
dotenv.config({
  path: "../../.env",
});
// require('dotenv').config()

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMail({ to, name }) {
  const mailOptions = {
    from: "5devs <eliasdev@zify.com.br>",
    to,
    subject: "pedido efetudo com sucesso - PDV5devs",
    text: `Obrigado  Sr(a): ${name}  por comprar conosco`,
    html: `<div><h1> Obrigado Sr(a): ${name}   por comprar conosco</h1></div>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
