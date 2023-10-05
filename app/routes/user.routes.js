const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // get user all
  app.get(
    "/api/users",
    [authJwt.verifyToken],
    controller.getAllUsers
  );

  // update profile user
  app.patch(
    "/api/user/profile/:id",
    [authJwt.verifyToken],
    controller.updateUserProfile
  );

};