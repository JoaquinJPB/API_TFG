const Journal = require("../models/journal.model")

const getAllJournals = (req, res) => {
  const searchName = req.query.title
  if (req.query.title) {
    Journal.find({ title: { $regex: searchName, $options: "$i" } })
      .then((journals) => {
        console.log(journals)
        res.send({ status: "OK", data: journals })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  } else {
    Journal.find()
      .then((journals) => {
        console.log(journals)
        res.send({ status: "OK", data: journals })
      })
      .catch((error) => res.status(404).send({ status: "error", data: error }))
  }
}

const getJournalByUserId = (req, res) => {
  Journal.find({ owner: req.params.owner })
    .then((journal) => {
      console.log(journal)
      res.send({ status: "OK", data: journal })
    })
    .catch((error) => res.status(404).send({ status: "error", data: error }))
}


const createJournal = (req, res) => {
  Journal.create(req.body)
    .then((journal) => {
      console.log(journal)
      res.send({ status: "OK", data: journal })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const deleteJournal = (req, res) => {
  const id = req.params.id
  Journal.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send({ status: "OK" })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

const updateJournal = (req, res) => {
  const id = req.params.id
  const journalBody = req.body
  Journal.findByIdAndUpdate({ _id: id }, journalBody, { new: true })
    .then((journal) => {
      res.send({ status: "OK", data: journal })
    })
    .catch((error) => res.status(400).send({ status: "error", data: error }))
}

module.exports = {
  getAllJournals,
  getJournalByUserId,
  createJournal,
  deleteJournal,
  updateJournal,
}