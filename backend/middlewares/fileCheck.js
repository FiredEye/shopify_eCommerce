const path = require("path");
const fs = require("fs");
const { getDownloadURL } = require("firebase-admin/storage");
const bucket = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const extTypes = [".jpg", ".jpeg", ".png"];

const getContentType = (fileExtension) => {
  switch (fileExtension.toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
};
const handleFileUpload = async (req, res, next, uploadPath, fieldName) => {
  try {
    if (req.files && req.files[fieldName]) {
      const file = req.files[fieldName];

      if (extTypes.includes(path.extname(file.name))) {
        const fileName = uuidv4() + path.extname(file.name);
        const destinationPath = `${uploadPath}/${fileName}`;

        const fileBuffer = file.data;
        const contentType = getContentType(path.extname(file.name));

        const tempFilePath = path.join(__dirname, `${uuidv4()}.jpg`);

        fs.writeFileSync(tempFilePath, fileBuffer);

        await bucket.upload(tempFilePath, {
          destination: destinationPath,
          metadata: {
            contentType,
          },
        });
        const fileRef = bucket.file(destinationPath);
        const downloadURL = await getDownloadURL(fileRef);
        fs.unlinkSync(tempFilePath);
        req.image = downloadURL;
        return next();
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

const handleFileUpdate = async (req, res, next, uploadPath, fieldName) => {
  try {
    if (req.files && req.files[fieldName]) {
      const file = req.files[fieldName];

      if (req.body?.old_imgPath) {
        const oldImageUrl = req.body.old_imgPath;
        const fullFilePath = decodeURIComponent(new URL(oldImageUrl).pathname);
        const filePath = fullFilePath.substring(
          process.env.FIREBASE_BUCKET_URL.length
        );
        const oldFile = bucket.file(filePath);

        const exists = await oldFile.exists();

        if (exists[0]) {
          await oldFile.delete();
        } else {
          console.log("File does not exist.");
        }
      }

      if (extTypes.includes(path.extname(file.name))) {
        const fileName = uuidv4() + path.extname(file.name);
        const destinationPath = `${uploadPath}/${fileName}`;
        const fileBuffer = file.data;
        const contentType = getContentType(path.extname(file.name));

        const tempFilePath = path.join(__dirname, `${uuidv4()}.jpg`);
        fs.writeFileSync(tempFilePath, fileBuffer);
        await bucket.upload(tempFilePath, {
          destination: destinationPath,
          metadata: {
            contentType,
          },
        });
        const fileRef = bucket.file(destinationPath);
        const downloadURL = await getDownloadURL(fileRef);
        fs.unlinkSync(tempFilePath);
        req.image = downloadURL;
        return next();
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

const deleteFile = async (req, res, next) => {
  try {
    if (req.body?.old_productImg) {
      // Delete the old image from Firebase Storage
      const oldImagePath = req.body.old_productImg;
      const pathWithoutBucket = oldImagePath.replace(
        process.env.FIREBASE_BUCKET_PATH,
        ""
      );
      const oldImageRef = bucket.file(pathWithoutBucket);
      await oldImageRef.delete();
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
