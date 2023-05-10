const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const couldinary = require("../services/couldinary");
const mail = require("../services/emailService");
const { unlinkSync } = require("fs");

const signUp = async (req, res) => {
  const registerData = new userSchema(req.body);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      req.file ? unlinkSync(req.file.path) : null // Delete multer unnecessary uploaded photo
      res.status(409).json({
        success: false,
        message: "User is already existed with this email",
      });
    } else {
      if (req.file !== undefined) {
        const result = await couldinary.uploader.upload(req.file.path, {
          public_id: `${registerData._id}_${Date.now()}_ProfilePIC`,
        });
        registerData.profilePic = result.url;
      }
      registerData.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      const user = await registerData.save();
      res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      Error: `Error occur ${error.stack}`,
    });
  }
};

const logIn = async (req, res) => {
  const user = await userSchema.findOne({
    userEmail: req.body.userEmail,
  });
  if (user) {
    const hashPassword = await bcrypt.compare(
      req.body.userPassword,
      user.userPassword
    );
    if (user && hashPassword) {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
        expiresIn: "2h",
      });
      res.status(200).json({
        success: true,
        message: "Login successfully",
        token: accessToken,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "User is not registered with this email",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: userEmail,
    });
    if (isUserExist) {
      const secret = isUserExist.userPassword + process.env.ACCESS_TOKEN;
      const token = jwt.sign(
        { userEmail: isUserExist.userEmail, _id: isUserExist._id },
        secret,
        { expiresIn: "5m" }
      );
      mail.sendEmail(userEmail, token, isUserExist._id);
      res.status(200).json({
        success: true,
        message: "Email send sucessfully",
        token: token,
        userId: isUserExist._id,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Email is not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { id, token } = req.params;
  try {
    const isUserExist = await userSchema.findById({ _id: id });
    const secret = isUserExist.userPassword + process.env.ACCESS_TOKEN;
    jwt.verify(token, secret);
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        res.status(400).json({
          success: false,
          message: "New password and confirm password are not same",
        });
      } else {
        const hashPassword = await bcrypt.hash(confirmPassword, 10);
        await userSchema.findByIdAndUpdate(isUserExist._id, {
          $set: { userPassword: hashPassword },
        });
        res.status(201).json({
          success: true,
          message: "Password reset successfully",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
};
