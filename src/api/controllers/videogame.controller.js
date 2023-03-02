const Videogame = require("../models/videogame.model")

const getAllVideogames = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Videogame.find({ title: { $regex: searchName, $options: "$i" } })
      .then((videogames) => {
        console.log(videogames)
        res.send({ status: "OK", data: videogames })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Videogame.find()
      .then((videogames) => {
        console.log(videogames)
        res.send({ status: "OK", data: videogames })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getVideogameById = (req, res) => {
  Videogame.findById(req.params.id)
    .then((videogame) => {
      console.log(videogame)
      res.send({ status: "OK", data: videogame })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createVideogame = (req, res) => {
  Videogame.create(req.body)
    .then((videogame) => {
      console.log(videogame)
      res.send({ status: "OK", data: videogame })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteVideogame = (req, res) => {
  const id = req.params.id
  Videogame.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateVideogame = (req, res) => {
  const id = req.params.id
  const videogameBody = req.body
  Videogame.findByIdAndUpdate({ _id: id }, videogameBody, { new: true })
    .then((videogame) => {
      res.send({ status: "OK", data: videogame })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllVideogames,
  getVideogameById,
  createVideogame,
  deleteVideogame,
  updateVideogame,
}
