const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resettokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  resetToken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
})

let RESET_TOKEN = mongoose.model('passwordResetToken', resettokenSchema)
module.exports = RESET_TOKEN
