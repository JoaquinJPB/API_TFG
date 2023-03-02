const { authJwt } = require("../middleware")
const controller = require("../controllers/breath.controller")

module.exports = function (app) {
  app.get("/api/breaths", controller.getAllBreaths)
  app.get("/api/breaths/:id", controller.getBreathById)
  app.post(
    "/api/breaths",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.createBreath
  )
  app.delete(
    "/api/breaths/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.deleteBreath
  )
  app.patch(
    "/api/breaths/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.updateBreath
  )
}
