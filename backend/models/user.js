const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile_image: { type: String, required: true },

    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      isEmpty: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
