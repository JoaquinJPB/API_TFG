const { authJwt } = require("../middleware")
const controller = require("../controllers/user.controller")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
    next()
  })
  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  )
  app.get(
    "/api/admin/users/:nickname",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserByNickname
  )
  app.post(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createUser
  )
  app.delete(
    "/api/admin/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  )
  app.patch(
    "/api/admin/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  )
}
