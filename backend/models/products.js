const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_info: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    comment: { type: String, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_detail: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    product_image: { type: String, required: true },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
