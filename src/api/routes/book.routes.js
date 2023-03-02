const { authJwt } = require("../middleware")
const controller = require("../controllers/book.controller")

module.exports = function (app) {
  app.get("/api/books", controller.getAllBooks)
  app.get("/api/books/:id", controller.getBookById)
  app.post(
    "/api/books",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.createBook
  )
  app.delete(
    "/api/books/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.deleteBook
  )
  app.patch(
    "/api/books/:id",
    [authJwt.verifyToken, authJwt.havePermissions],
    controller.updateBook
  )
}
