const Movie = require("../models/movie.model")

const getAllMovies = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Movie.find({ title: { $regex: searchName, $options: "$i" } })
      .then((movies) => {
        console.log(movies)
        res.send({ status: "OK", data: movies })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Movie.find()
      .then((movies) => {
        console.log(movies)
        res.send({ status: "OK", data: movies })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getMovieById = (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      console.log(movie)
      res.send({ status: "OK", data: movie })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createMovie = (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      console.log(movie)
      res.send({ status: "OK", data: movie })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteMovie = (req, res) => {
  const id = req.params.id
  Movie.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateMovie = (req, res) => {
  const id = req.params.id
  const movieBody = req.body
  Movie.findByIdAndUpdate({ _id: id }, movieBody, { new: true })
    .then((movie) => {
      res.send({ status: "OK", data: movie })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
}
