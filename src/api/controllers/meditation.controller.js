const Meditation = require("../models/meditation.model")

const getAllMeditations = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Meditation.find({ title: { $regex: searchName, $options: "$i" } })
      .then((meditations) => {
        console.log(meditations)
        res.send({ status: "OK", data: meditations })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Meditation.find()
      .then((meditations) => {
        console.log(meditations)
        res.send({ status: "OK", data: meditations })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getMeditationById = (req, res) => {
  Meditation.findById(req.params.id)
    .then((meditation) => {
      console.log(meditation)
      res.send({ status: "OK", data: meditation })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createMeditation = (req, res) => {
  Meditation.create(req.body)
    .then((meditation) => {
      console.log(meditation)
      res.send({ status: "OK", data: meditation })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteMeditation = (req, res) => {
  const id = req.params.id
  Meditation.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateMeditation = (req, res) => {
  const id = req.params.id
  const meditationBody = req.body
  Meditation.findByIdAndUpdate({ _id: id }, meditationBody, { new: true })
    .then((meditation) => {
      res.send({ status: "OK", data: meditation })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllMeditations,
  getMeditationById,
  createMeditation,
  deleteMeditation,
  updateMeditation,
}
