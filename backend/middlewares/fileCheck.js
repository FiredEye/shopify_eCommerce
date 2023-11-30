const path = require("path");
const fs = require("fs");
const checkFile = (req, res, next) => {
  try {
    if (req.files?.product_image) {
      const file = req.files.product_image;

      const extTypes = [".jpg", ".jpeg", ".png"];
      if (extTypes.includes(path.extname(file.name))) {
        const fileName = `${Date.now()}${file.name}`;
        file.mv(`./uploads/${fileName}`, (err) => {
          if (err) {
            console.error(`Error moving file: ${err}`);
            return res.status(400).json("failed to save image in the server!");
            // You may want to send an error response back to the client here
          } else {
            req.image = `/uploads/${fileName}`;
            return next();
          }
        });
      } else {
        return res.status(400).json("please provide valid image");
      }
    } else {
      return res.status(400).json("please provide image");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};

const updateFile = (req, res, next) => {
  try {
    if (req.files?.product_image && req.body?.old_productImg) {
      fs.unlink(`.${req.body?.old_productImg}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return res.status(401).json("Error Updating Image");
        }
      });
      const file = req.files.product_image;

      const extTypes = [".jpg", ".jpeg", ".png"];
      if (extTypes.includes(path.extname(file.name))) {
        const fileName = `${Date.now()}${file.name}`;
        file.mv(`./uploads/${fileName}`, (err) => {
          if (err) {
            console.error(`Error moving file: ${err}`);
            return res.status(400).json("failed to save image in the server!");
            // You may want to send an error response back to the client here
          } else {
            req.image = `/uploads/${fileName}`;
            return next();
          }
        });
      } else {
        return res.status(400).json("please provide valid image");
      }
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};
const deleteFile = (req, res, next) => {
  try {
    if (req.body?.old_productImg) {
      fs.unlink(`.${req.body?.old_productImg}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return res.status(401).json("Error Deleting Image");
        } else {
          // console.log("File deleted successfully");
          return next();
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};
module.exports = { checkFile, updateFile, deleteFile };
