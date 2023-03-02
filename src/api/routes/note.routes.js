const { authJwt } = require("../middleware")
const controller = require("../controllers/note.controller")

module.exports = function (app) {
  app.get("/api/notes", controller.getAllNotes)
  app.get("/api/notes/:owner", controller.getNotesByUserId)
  app.get("/api/notes/journal/:journal", controller.getNotesByJournalId)
  app.post("/api/notes", controller.createNote)
  app.delete("/api/notes/:id", controller.deleteNote)
  app.patch("/api/notes/:id", controller.updateNote)
}
