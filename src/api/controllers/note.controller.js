const Note = require("../models/note.model")
const Journal = require("../models/journal.model")

const getAllNotes = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Note.find({ title: { $regex: searchName, $options: "$i" } })
      .then((Notes) => {
        console.log(Notes)
        res.send({ status: "OK", data: movies })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Note.find()
      .then((Notes) => {
        console.log(Notes)
        res.send({ status: "OK", data: Notes })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getNotesByUserId = (req, res) => {
  Note.find({ owner: req.params.owner })
    .then((notes) => {
      console.log(notes)
      res.send({ status: "OK", data: notes })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const getNotesByJournalId = (req, res) => {
  Note.find({ journal: req.params.journal })
    .then((notes) => {
      console.log(notes)
      res.send({ status: "OK", data: notes })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}

const createNote = (req, res) => {
  Note.create(req.body)
    .then((note) => {
      console.log(note)
      Journal.findOne({ _id: req.body.journal })
        .then((journal) => {
          journal.notes.push(note)
          journal.save()
          res.send({ status: "OK", data: [note, journal] })
        })
        .catch((error) =>
          res.status(404).send({ status: "error", data: error })
        )
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteNote = (req, res) => {
  const id = req.params.id
  Note.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateNote = (req, res) => {
  const id = req.params.id
  const noteBody = req.body
  Note.findByIdAndUpdate({ _id: id }, noteBody, { new: true })
    .then((note) => {
      res.send({ status: "OK", data: note })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllNotes,
  getNotesByUserId,
  getNotesByJournalId,
  createNote,
  deleteNote,
  updateNote,
}
