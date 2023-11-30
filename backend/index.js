const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use(
  fileUpload({
    limits: { fileSize: 15 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use((req, res) => {
  res.status(404).json("not found");
});

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    app.listen(5000, () => {
      console.log("server running");
    });
  })
  .catch((error) => console.log(error));
