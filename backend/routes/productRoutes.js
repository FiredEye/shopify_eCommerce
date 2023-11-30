const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const check = require("../middlewares/authCheck");
const checkFile = require("../middlewares/fileCheck");

router.get("/api/products", productController.getAllProducts);
router.get("/api/product/:id", productController.getProductById);
router.patch(
  "/api/updateProduct/:id",
  check.checkAdmin,
  checkFile.updateFile,
  productController.updateProductById
);
router.post(
  "/api/addProduct",
  check.checkUser,
  check.checkAdmin,
  checkFile.checkFile,
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
