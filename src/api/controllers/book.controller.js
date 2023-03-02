const Book = require("../models/book.model")

const getAllBooks = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Book.find({ title: { $regex: searchName, $options: "$i" } })
      .then((books) => {
        console.log(books)
        res.send({ status: "OK", data: books })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Book.find()
      .then((books) => {
        console.log(books)
        res.send({ status: "OK", data: books })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getBookById = (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      console.log(book)
      res.send({ status: "OK", data: book })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createBook = (req, res) => {
  Book.create(req.body)
    .then((book) => {
      console.log(book)
      res.send({ status: "OK", data: book })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteBook = (req, res) => {
  const id = req.params.id
  Book.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateBook = (req, res) => {
  const id = req.params.id
  const bookBody = req.body
  Book.findByIdAndUpdate({ _id: id }, bookBody, { new: true })
    .then((book) => {
      res.send({ status: "OK", data: book })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = { getAllBooks, getBookById, createBook, deleteBook, updateBook }
