const mongoose = require("mongoose")
const Schema = mongoose.Schema

const JournalSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
  date: { type: Date, default: Date.now },
})

let JOURNAL = mongoose.model("Journal", JournalSchema)
module.exports = JOURNAL
