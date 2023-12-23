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
  const { fullname, email, password, profile_image } = req.body;

  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      res.status(403).json("Email already exist!!");
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        fullname,
        email,
        password: hash,
        profile_image,
      });
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
        process.env.JWT_SECRET
      );
      if (isPass)
        return res.status(201).json({
          email,
          token,
          fullname: isExist.fullname,
          isAdmin: isExist.isAdmin,
          shippingAddress: isExist.shippingAddress,
          profile_image: isExist.profile_image,
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
    const { fullname, address, city, profile_image = "" } = req.body;

    const updateObject = {
      fullname,
      shippingAddress: { address, city, isEmpty: false },
    };

    if (profile_image) {
      updateObject.profile_image = profile_image;
    }

    const response = await User.findByIdAndUpdate(_id, updateObject, {
      new: true,
    });

    if (!response) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      fullname: response.fullname,
      shippingAddress: response.shippingAddress,
      profile_image: response.profile_image,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAdminDetail = async (req, res) => {
  try {
    const updateObject = req.body;

    const response = await User.findByIdAndUpdate(req.adminId, updateObject, {
      new: true,
    });

    if (!response) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      fullname: response.fullname,
      email: response.email,
      profile_image: response.profile_image,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  userRegister,
  userLogin,
  updateUserDetail,
  updateAdminDetail,
};
