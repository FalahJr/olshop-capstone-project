const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // get all product
  app.get(
    "/api/products",
    [authJwt.verifyToken],
    controller.getAllProducts
  );

  // get product by rating
  app.get(
    "/api/product/hot-product",
    [authJwt.verifyToken],
    controller.getHotProduct
  );

  // get product by created
  app.get(
    "/api/product/arrival-product",
    [authJwt.verifyToken],
    controller.getArrivalProduct
  );
};