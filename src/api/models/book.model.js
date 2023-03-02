const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: { type: String },
  description: { type: String },
  author: { type: String },
  img: { type: String },
})

let BOOK = mongoose.model("Book", BookSchema)
module.exports = BOOK
