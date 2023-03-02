const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = {}
db.mongoose = mongoose
db.user = require("./user.model")
db.role = require("./role.model")

db.resetToken = require("./resetToken.model")

db.book = require("./book.model")
db.movie = require("./movie.model")
db.videogame = require("./videogame.model")
db.advice = require("./advice.model")
db.breath = require("./breath.model")
db.meditation = require("./meditation.model")
db.journal = require("./journal.model")
db.note = require("./note.model")

db.ROLES = ["user", "admin", "moderator"]
module.exports = db
