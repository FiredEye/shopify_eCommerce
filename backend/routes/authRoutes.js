const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const Joi = require("joi");
const { checkUser, checkAdmin } = require("../middlewares/authCheck");
const Validator = require("express-joi-validation").createValidator();

const registerSchema = Joi.object({
  fullname: Joi.string().max(20).required(),
  email: Joi.string().email().required("mail is req"),
  password: Joi.string().min(5).max(20).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required("mail is req"),
  password: Joi.string().min(5).max(20).required(),
});

const userDetailSchema = Joi.object({
  fullname: Joi.string().min(5).max(20).optional(),
  address: Joi.string().min(3).required("address is required"),
  city: Joi.string().min(5).max(25).required("city is required"),
  isEmpty: Joi.boolean(),
});
const adminDetailSchema = Joi.object({
  fullname: Joi.string().min(5).max(20).required("Required"),
  email: Joi.string().email().required("mail is req"),
});
router.post(
  "/api/userRegister",
  Validator.body(registerSchema),
  auth.userRegister
);

router.post("/api/userLogin", Validator.body(loginSchema), auth.userLogin);
router.patch(
  "/api/updateUserDetail",
  checkUser,
  Validator.body(userDetailSchema),
  auth.updateUserDetail
);
router.patch(
  "/api/updateAdminDetail",
  checkAdmin,
  Validator.body(adminDetailSchema),
  auth.updateAdminDetail
);
module.exports = router;
