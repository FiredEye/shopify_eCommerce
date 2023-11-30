const jwt = require("jsonwebtoken");
const user = require("../models/user");
const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json("not authorized");
  const decode = jwt.decode(token, "jsontoken");
  if (!decode) return res.status(404).json("not authorized");
  const { isAdmin, id } = decode;
  if (!isAdmin) return res.status(404).json("not authorized");
  req.adminId = id;
  next();
};

const checkUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json("not authorized");
  const decode = jwt.decode(token, "jsontoken");
  if (!decode) return res.status(404).json("not authorized");
  const { id } = decode;
  const User = await user.findById(id).select("-password");
  req.user = User;
  next();
};
module.exports = { checkAdmin, checkUser };
