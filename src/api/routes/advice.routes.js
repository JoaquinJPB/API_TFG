const { authJwt } = require("../middleware")
const controller = require("../controllers/advice.controller")

module.exports = function (app) {
  app.get("/api/advice", controller.getAllAdvice)
  app.get("/api/advice/:id", controller.getAdviceById)
  app.post(
    "/api/advice",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.createAdvice
  )
  app.delete(
    "/api/advice/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.deleteAdvice
  )
  app.patch(
    "/api/advice/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.updateAdvice
  )
}
