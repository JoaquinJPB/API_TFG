const config = require("../config/auth.config")
const db = require("../models")
const User = db.user
const passwordResetToken = db.resetToken
const Role = db.role
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

require("dotenv").config({ path: "../.env" })

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      user.roles = [role._id]
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
        res.send({ message: "User was registered successfully!" })
      })
    })
  })
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." })
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" })
      }
      var token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      )
      var authorities = []
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
      }
      req.session.token = token
      res.status(200).send({
        jwt: token,
      })
    })
}

exports.signout = async (req, res) => {
  try {
    req.session = null
    return res.status(200).send({ message: "You've been signed out!" })
  } catch (err) {
    this.next(err)
  }
}

exports.ResetPassword = async (req, res) => {
  if (!req.body.email) {
    return res.status(500).json({ message: "Email is required" })
  }
  const user = await User.findOne({
    email: req.body.email,
  })
  if (!user) {
    return res.status(409).json({ message: "Email does not exist" })
  }
  let resetToken = new passwordResetToken({
    _userId: user._id,
    resetToken: crypto.randomBytes(16).toString("hex"),
  })
  resetToken.save(function (err) {
    if (err) {
      return res.status(500).send({ msg: err.message })
    }
    passwordResetToken
      .find({ _userId: user._id, resetToken: { $ne: resetToken.resetToken } })
      .deleteOne()
      .exec()
    res.status(200).json({ message: "Reset Password successfully." })
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
      to: user.email,
      from: "csaservice00@gmail.com",
      subject: "Restablecer contraseña",
      text:
        "Está recibiendo esto porque usted (u otra persona) ha solicitado el restablecimiento de la contraseña de su cuenta.\n\n" +
        "Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso:\n\n" +
        process.env.ORIGIN+"/new_password/" +
        resetToken.resetToken +
        "\n\n" +
        "Si no lo ha solicitado, ignore este correo electrónico y su contraseña permanecerá inalterada.\n",
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (!info) {
        return res.status(409).json({ message: err })
      }
      return res.status(200).json({ message: info })
    })
  })
}

exports.ValidPasswordToken = async (req, res) => {
  if (!req.body.resetToken) {
    return res.status(500).json({ message: "Token is required" })
  }
  const user = await passwordResetToken.findOne({
    resetToken: req.body.resetToken,
  })
  if (!user) {
    return res.status(409).json({ message: "Invalid URL" })
  }
  User.findById({ _id: user._userId })
    .then(() => {
      res.status(200).json({ message: "Token verified successfully." })
    })
    .catch((err) => {
      return res.status(500).send({ msg: err.message })
    })
}

exports.NewPassword = async (req, res) => {
  passwordResetToken.findOne(
    { resetToken: req.body.resetToken },
    function (err, userToken, next) {
      if (!userToken) {
        return res.status(409).json({ message: "Token has expired" })
      }

      User.findOne(
        {
          _id: userToken._userId,
        },
        function (err, userEmail, next) {
          if (!userEmail) {
            return res.status(409).json({ message: "User does not exist" })
          }
          return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) {
              return res.status(400).json({ message: "Error hashing password" })
            }
            userEmail.password = hash
            userEmail.save(function (err) {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Password can not reset." })
              } else {
                userToken.remove()
                return res
                  .status(201)
                  .json({ message: "New password set successfully" })
              }
            })
          })
        }
      )
    }
  )
}
