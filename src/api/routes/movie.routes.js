const { authJwt } = require("../middleware")
const controller = require("../controllers/movie.controller")

module.exports = function (app) {
  app.get("/api/movies", controller.getAllMovies)
  app.get("/api/movies/:id", controller.getMovieById)
  app.post(
    "/api/movies",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.createMovie
  )
  app.delete(
    "/api/movies/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.deleteMovie
  )
  app.patch(
    "/api/movies/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.updateMovie
  )
}
