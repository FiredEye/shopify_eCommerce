const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Order = require("../models/order");
const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json("not authorized");
  const decode = jwt.decode(token, process.env.JWT_SECRET);
  if (!decode) return res.status(404).json("not authorized");
  const { isAdmin, id } = decode;
  if (!isAdmin) return res.status(404).json("not authorized");
  req.adminId = id;
  next();
};

const checkUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json("not authorized");
  const decode = jwt.decode(token, process.env.JWT_SECRET);
  if (!decode) return res.status(404).json("not authorized");
  const { id } = decode;
  const user = await User.findById(id).select("-password");
  req.user = user;
  next();
};
const hasOrderedProduct = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const order = await Order.findOne({
    user: userId,
    "orderItems.product": productId,
  });

  if (order) {
    return next();
  } else {
    res
      .status(403)
      .json({
        message: "Users can only review products that have been ordered.",
      });
  }
};

module.exports = { checkAdmin, checkUser, hasOrderedProduct };
