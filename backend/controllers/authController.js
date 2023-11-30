const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const userRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      res.status(403).json("Email already exist!!");
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({ fullname, email, password: hash });
      res.status(201).json("user created sucessfully");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      const isPass = bcrypt.compareSync(password, isExist.password);
      const token = jwt.sign(
        {
          id: isExist._id,
          isAdmin: isExist.isAdmin,
        },
        "jsontoken"
      );
      if (isPass)
        return res.status(201).json({
          email,
          token,
          fullname: isExist.fullname,
          isAdmin: isExist.isAdmin,
          shippingAddress: isExist.shippingAddress,
        });
      return res.status(401).json("password does not match");
    } else {
      res.status(401).json("invalid credentials");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUserDetail = async (req, res) => {
  try {
    const { _id } = req.user;
    const { fullname, address, city } = req.body;
    const response = await User.findByIdAndUpdate(_id, {
      fullname,
      shippingAddress: { address, city, isEmpty: false },
    });
    res.status(201).json("User details updated successfully");
  } catch (err) {
    res.status(401).json(err);
  }
};
const updateAdminDetail = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    const response = await User.findByIdAndUpdate(req.adminId, {
      fullname,
      email,
    });
    res.status(201).json("User details updated successfully");
  } catch (err) {
    res.status(401).json(err);
  }
};
module.exports = {
  getUsers,
  userRegister,
  userLogin,
  updateUserDetail,
  updateAdminDetail,
};
