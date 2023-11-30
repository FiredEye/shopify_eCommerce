const Order = require("../models/order");

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "user",
      select: ["email", "fullname"],
    });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
const getOrderByIdForAdmin = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id }).populate({
      path: "user",
      select: ["email", "fullname"],
    });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req?.user._id });
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

const addOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress } = req.body;
  try {
    await Order.create({
      user: req?.user._id,
      orderItems,
      totalPrice,
      shippingAddress,
    });
    return res.status(200).json("order added successfully");
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const orderStatus = await Order.findByIdAndUpdate(id, req.body);
    return res.status(200).json("Order Status Updated");
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
module.exports = {
  addOrder,
  getAllOrder,
  getOrderById,
  getOrderByUser,
  getOrderByIdForAdmin,
  updateOrderStatus,
};
