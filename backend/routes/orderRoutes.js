const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const check = require("../middlewares/authCheck");

router.get("/api/getOrders", check.checkAdmin, orderController.getAllOrder);

router.get(
  "/api/getUserOrder",
  check.checkUser,
  orderController.getOrderByUser
);

router.get(
  "/api/getOrderById/:id",
  check.checkUser,
  orderController.getOrderById
);
router.get(
  "/api/getOrderByIdForAdmin/:id",
  check.checkAdmin,
  orderController.getOrderByIdForAdmin
);
router.post("/api/createOrder", check.checkUser, orderController.addOrder);
router.patch(
  "/api/updateOrderStatus/:id",
  check.checkAdmin,
  orderController.updateOrderStatus
);

module.exports = router;
