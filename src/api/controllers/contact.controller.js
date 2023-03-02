const nodemailer = require("nodemailer")

require("dotenv").config({ path: "../.env" })

exports.sendEmail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  })
  let mailOptions = {
    to: process.env.USER_EMAIL,
    from: req.body.email,
    subject: "Contacto - "+req.body.name,
    text:
      `Nombre: ${req.body.name}`+ "\n\n" +
      `Email: ${req.body.email}`+ "\n\n" +
      `Teléfono: ${req.body.number}`
      + "\n\n" +
      req.body.message
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (!info) {
      return res.status(409).json({ message: err })
    }
    return res.status(200).json({ message: info })
  })
}