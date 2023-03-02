const Breath = require("../models/breath.model")

const getAllBreaths = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Breath.find({ title: { $regex: searchName, $options: "$i" } })
      .then((breaths) => {
        console.log(breaths)
        res.send({ status: "OK", data: breaths })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Breath.find()
      .then((breaths) => {
        console.log(breaths)
        res.send({ status: "OK", data: breaths })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getBreathById = (req, res) => {
  Breath.findById(req.params.id)
    .then((breath) => {
      console.log(breath)
      res.send({ status: "OK", data: breath })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createBreath = (req, res) => {
  Breath.create(req.body)
    .then((breath) => {
      console.log(breath)
      res.send({ status: "OK", data: breath })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteBreath = (req, res) => {
  const id = req.params.id
  Breath.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateBreath = (req, res) => {
  const id = req.params.id
  const breathBody = req.body
  Breath.findByIdAndUpdate({ _id: id }, breathBody, { new: true })
    .then((breath) => {
      res.send({ status: "OK", data: breath })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllBreaths,
  getBreathById,
  createBreath,
  deleteBreath,
  updateBreath,
}
