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
    let query = {};

    const category = req.params.category;

    if (category && category.toLowerCase() !== "all") {
      query = { category: category.toLowerCase() };
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    const skip = (page - 1) * limit;
    const totalProductsCount = await Product.countDocuments(query);

    const totalPages = Math.ceil(totalProductsCount / limit);

    const products = await Product.find(query).skip(skip).limit(limit);
    return res.status(200).json({ products, totalPages });
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};
const getSearchProducts = async (req, res) => {
  try {
    const search = req.params.search;

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const totalProductsCount = await Product.countDocuments(query);

    const totalPages = Math.ceil(totalProductsCount / limit);

    const products = await Product.find(query).skip(skip).limit(limit);

    return res.status(200).json({ products, totalPages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getSimilarProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    if (mongoose.isValidObjectId(productId)) {
      const currentProduct = await Product.findById(productId);

      if (!currentProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const similarProducts = await Product.find({
        $text: {
          $search: `${currentProduct.product_name} ${currentProduct.category} ${currentProduct.brand} ${currentProduct.product_detail}`,
        },
        _id: { $ne: productId },
      }).limit(6);

      return res.status(200).json(similarProducts);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
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
          select: ["fullname", "profile_image"],
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
    if (mongoose.isValidObjectId(id)) {
      const existingReview = await Product.findOne({
        _id: id,
        "reviews.user_info": req.user._id,
      });

      if (existingReview) {
        return res.status(400).json({ message: "Users can only review once!" });
      }
      const product = await Product.findById(id);
      const newReview = { user_info: req.user._id, ...req.body };

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
  getSearchProducts,
  getSimilarProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addReview,
};
