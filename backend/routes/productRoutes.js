const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const check = require("../middlewares/authCheck");
const checkFile = require("../middlewares/fileCheck");

router.get("/api/products/:category", productController.getAllProducts);
router.get("/api/searchProducts/:search", productController.getSearchProducts);
router.get("/api/similarProducts/:id", productController.getSimilarProducts);
router.get("/api/product/:id", productController.getProductById);
router.patch(
  "/api/updateProduct/:id",
  check.checkAdmin,
  checkFile.updateProductFile,
  productController.updateProductById
);
router.post(
  "/api/addProduct",
  check.checkUser,
  check.checkAdmin,
  checkFile.checkProductFile,
  productController.createProduct
);
router.delete(
  "/api/deleteProduct/:id",
  check.checkAdmin,
  checkFile.deleteFile,
  productController.deleteProductById
);

router.patch(
  "/api/reviewProduct/:id",
  check.checkUser,
  check.hasOrderedProduct,
  productController.addReview
);

// can put multiple methods in the same route
// router
// .route("/api/product/:id")
// .get(productController.getProductById)
// .delete(
//   check.checkAdmin,
//   checkFile.deleteFile,
//   productController.deleteProductById
// )
// .all((req, res) => {
//   res.status(405).json("method not found!");
// });

module.exports = router;
