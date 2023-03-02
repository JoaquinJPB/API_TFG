const { authJwt } = require("../middleware")
const controller = require("../controllers/journal.controller")

module.exports = function (app) {
  app.get("/api/journals", controller.getAllJournals)
  app.get("/api/journals/:owner", controller.getJournalByUserId)
  app.post("/api/journals", controller.createJournal)
  app.delete("/api/journals/:id", controller.deleteJournal)
  app.patch("/api/journals/:id", controller.updateJournal)
}
