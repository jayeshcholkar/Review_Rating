const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const registerData = new userSchema(req.body);
  console.log(registerData);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      res.status(409).json({
        success: false,
        message: "User is already existed with this email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      registerData.userPassword = await bcrypt.hash(
        req.body.userPassword,
        salt
      );
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
      Error: "Error occur " + error,
    });
  }
};

const logIn = async (req, res) => {
  const user = await userSchema.findOne({
    userEmail: req.body.userEmail,
  });
  //   console.log(user.userPassword)
  if (user) {
    const hashPassword = await bcrypt.compare(
      req.body.userPassword,
      user.userPassword
    );
    if (user && hashPassword) {
      res.status(200).json({
        success: true,
        message: "Login successfully",
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

module.exports = {
  signUp,
  logIn,
};
