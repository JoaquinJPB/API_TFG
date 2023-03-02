const { authJwt } = require("../middleware")
const controller = require("../controllers/meditation.controller")

module.exports = function (app) {
  app.get("/api/meditations", controller.getAllMeditations)
  app.get("/api/meditations/:id", controller.getMeditationById)
  app.post(
    "/api/meditations",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.createMeditation
  )
  app.delete(
    "/api/meditations/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.deleteMeditation
  )
  app.patch(
    "/api/meditations/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.updateMeditation
  )
}
