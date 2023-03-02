const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  journal: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
  title: { type: String },
  description: { type: String },
  mood: { type: String },
  date: { type: Date, default: Date.now },
})

let NOTE = mongoose.model("Note", NoteSchema)
module.exports = NOTE
