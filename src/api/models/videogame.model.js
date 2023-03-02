const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VideogameSchema = new Schema({
  title: { type: String },
  description: { type: String },
  developer: { type: String },
  img: { type: String },
})

let VIDEOGAME = mongoose.model("Videogame", VideogameSchema)
module.exports = VIDEOGAME
