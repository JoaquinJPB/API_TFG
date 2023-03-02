const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")
const app = express()

require("dotenv").config({ path: ".env" })

var corsOptions = {
  origin: process.env.ORIGIN,
}

const db = require("../src/api/models")
const Role = db.role

db.mongoose
  .connect(process.env.MONGOO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.")
    initial()
  })
  .catch((err) => {
    console.error("Connection error", err)
    process.exit()
  })

app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())
// parse the JSON body from the HTTP request
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(
  cookieSession({
    name: "JoaquinJPB-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
)

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend of TFG." })
})

require("./api/routes/auth.routes")(app)
require("./api/routes/user.routes")(app)
require("./api/routes/book.routes")(app)
require("./api/routes/movie.routes")(app)
require("./api/routes/videogame.routes")(app)
require("./api/routes/advice.routes")(app)
require("./api/routes/meditation.routes")(app)
require("./api/routes/breath.routes")(app)
require("./api/routes/contact.routes")(app)
require("./api/routes/journal.routes")(app)
require("./api/routes/note.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err)
        }
        console.log("added 'user' to roles collection")
      })
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err)
        }
        console.log("added 'moderator' to roles collection")
      })
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err)
        }
        console.log("added 'admin' to roles collection")
      })
    }
  })
}
