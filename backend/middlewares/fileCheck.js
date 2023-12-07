const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const handleFileUpload = (req, res, next, uploadPath, fieldName) => {
  try {
    if (req.files && req.files[fieldName]) {
      const file = req.files[fieldName];

      const extTypes = [".jpg", ".jpeg", ".png"];
      if (extTypes.includes(path.extname(file.name))) {
        const fileName = uuidv4() + path.extname(file.name);
        const destinationPath = `./uploads/${uploadPath}/${fileName}`;

        file.mv(destinationPath, (err) => {
          if (err) {
            console.error(`Error moving file: ${err}`);
            return res.status(400).json("Failed to save image on the server!");
          } else {
            req.image = `/uploads/${uploadPath}/${fileName}`;
            return next();
          }
        });
      } else {
        return res.status(400).json("Please provide a valid image");
      }
    } else {
      return res.status(400).json(`Please provide a ${fieldName}`);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};

const checkProductFile = (req, res, next) => {
  handleFileUpload(req, res, next, "products", "product_image");
};

const checkProfileFile = (req, res, next) => {
  handleFileUpload(req, res, next, "profiles", "profile_image");
};

const handleFileUpdate = (req, res, next, uploadPath, fieldName) => {
  try {
    if (req.files && req.files[fieldName]) {
      const file = req.files[fieldName];
      fs.unlink(`.${req.body?.old_imgPath}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return res.status(401).json("Error updating image");
        }
      });

      const extTypes = [".jpg", ".jpeg", ".png"];
      if (extTypes.includes(path.extname(file.name))) {
        const fileName = uuidv4() + path.extname(file.name);
        const destinationPath = `./uploads/${uploadPath}/${fileName}`;

        file.mv(destinationPath, (err) => {
          if (err) {
            console.error(`Error moving file: ${err}`);
            return res.status(400).json("Failed to save image on the server!");
          } else {
            req.image = `/uploads/${uploadPath}/${fileName}`;
            return next();
          }
        });
      } else {
        return res.status(400).json("Please provide a valid image");
      }
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }
};

const updateProductFile = (req, res, next) => {
  handleFileUpdate(req, res, next, "products", "product_image");
};

const updateProfileFile = (req, res, next) => {
  handleFileUpdate(req, res, next, "profiles", "profile_image");
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
module.exports = {
  checkProfileFile,
  checkProductFile,
  updateProfileFile,
  updateProductFile,
  deleteFile,
};
