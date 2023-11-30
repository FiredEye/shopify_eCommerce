const Product = require("../models/products");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock,
  } = req.body;

  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      product_image: req.image,
      brand,
      category,
      countInStock,
    });

    return res.status(201).json("product create successfully");
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    if (mongoose.isValidObjectId(id)) {
      const product = await Product.findById(id).populate({
        path: "reviews",
        model: "reviews",
        populate: {
          path: "user_info",
          model: "user",
          select: "fullname",
        },
      });
      return res.status(200).json(product);
    } else return res.status(402).json("please provide valid product id!");
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};
const updateProductById = async (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  if (req.image) {
    updateObject.product_image = req.image;
  }
  try {
    if (mongoose.isValidObjectId(id)) {
      const response = await Product.findByIdAndUpdate(id, updateObject);
      return res.status(201).json("product updated successfully");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};
const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    if (mongoose.isValidObjectId(id)) {
      const response = await Product.findByIdAndDelete(id);
      return res.status(201).json("product deleted successfully");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};

const addReview = async (req, res) => {
  const id = req.params.id;

  try {
    const newReview = { user_info: req.user._id, ...req.body };

    if (mongoose.isValidObjectId(id)) {
      const product = await Product.findById(id);
      const isExist = product.reviews.find(
        (review) => review.user_info.toString() === req.user._id.toString()
      );

      if (isExist) {
        return res
          .status(402)
          .json({ message: "user can review only once", status: "bad" });
      }

      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;
      product.rating = calculateAverageRating(product.reviews);
      product.save();
      return res.status(201).json("review added successfully");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};
function calculateAverageRating(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round(totalRating / reviews.length);
}
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addReview,
};
