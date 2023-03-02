const { authJwt } = require("../middleware")
const controller = require("../controllers/videogame.controller")

module.exports = function (app) {
  app.get("/api/videogames", controller.getAllVideogames)
  app.get("/api/videogames/:id", controller.getVideogameById)
  app.post(
    "/api/videogames",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.createVideogame
  )
  app.delete(
    "/api/videogames/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.deleteVideogame
  )
  app.patch(
    "/api/videogames/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.updateVideogame
  )
}
