const Advice = require("../models/advice.model")

const getAllAdvice = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Advice.find({ title: { $regex: searchName, $options: "$i" } })
      .then((advice) => {
        console.log(advice)
        res.send({ status: "OK", data: advice })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Advice.find()
      .then((advice) => {
        console.log(advice)
        res.send({ status: "OK", data: advice })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getAdviceById = (req, res) => {
  Advice.findById(req.params.id)
    .then((advice) => {
      console.log(advice)
      res.send({ status: "OK", data: advice })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createAdvice = (req, res) => {
  Advice.create(req.body)
    .then((advice) => {
      console.log(advice)
      res.send({ status: "OK", data: advice })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteAdvice = (req, res) => {
  const id = req.params.id
  Advice.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateAdvice = (req, res) => {
  const id = req.params.id
  const adviceBody = req.body
  Advice.findByIdAndUpdate({ _id: id }, adviceBody, { new: true })
    .then((advice) => {
      res.send({ status: "OK", data: advice })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllAdvice,
  getAdviceById,
  createAdvice,
  deleteAdvice,
  updateAdvice,
}
