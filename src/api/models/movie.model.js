const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  title: { type: String },
  description: { type: String },
  director: { type: String },
  img: { type: String },
})

let MOVIE = mongoose.model("Movie", MovieSchema)
module.exports = MOVIE
