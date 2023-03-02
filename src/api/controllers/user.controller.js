const db = require("../models")

const User = db.user
const Role = db.role
const bcrypt = require("bcryptjs")

function getAllUsers(req, res) {
  User.find()
    .then((users) => {
      console.log(users)
      res.send({ status: "OK", data: users })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

function getUserByNickname(req, res) {
  const nickname = req.params.nickname
  User.findOne({ nickname: nickname })
    .then((user) => {
      if (user == null) {
        res.status(404).send("Usuario no existente")
      } else {
        console.log(user)
        res.send({ status: "OK", data: user })
      }
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

function createUser(req, res) {
  const userBody = req.body

  User.findOne({
    username: userBody.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" })
      return
    }
    // Email
    User.findOne({
      email: userBody.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" })
        return
      }
      userBody.password = bcrypt.hashSync(userBody.password, 8)
      Role.find(
        {
          name: { $in: userBody.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }
          userBody.roles = roles.map((role) => role._id)
          User.create(userBody)
            .then((createUser) => res.send({ status: "OK", data: createUser }))
            .catch((error) =>
              res.status(400).send({ status: "Error", data: error })
            )
        }
      )
    })
  })
}

function deleteUser(req, res) {
  const id = req.params.id
  User.deleteOne({ _id: id })
    .then(() => res.send({ status: "OK" }))
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

function updateUser(req, res) {
  const id = req.params.id
  const userBody = req.body

  User.findOne({
    username: userBody.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" })
      return
    }
    // Email
    User.findOne({
      email: userBody.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" })
        return
      }
      userBody.password = bcrypt.hashSync(userBody.password, 8)
      Role.find(
        {
          name: { $in: userBody.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }
          userBody.roles = roles.map((role) => role._id)
          User.findByIdAndUpdate({ _id: id }, userBody, { new: true })
            .then((updateUser) => res.json(updateUser))
            .catch((error) =>
              res.status(404).send({ status: "error", data: error })
            )
        }
      )
    })
  })
}

module.exports = {
  getAllUsers,
  getUserByNickname,
  createUser,
  deleteUser,
  updateUser,
}
