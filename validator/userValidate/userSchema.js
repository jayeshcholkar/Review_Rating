const joi = require("joi");

const userSchema = {
  userSingup: joi
    .object({
      userName: joi.string().required().min(6).max(10),
      userEmail: joi.string().required().email(),
      userPassword: joi.string().required().max(16).min(6),
      userCity: joi.string().required(),
      userState: joi.string().required(),
      phoneNum: joi
        .number() 
        .required()
        .min(1000000000)
        .max(9999999999)
        .message({
          message: "Number is not valid",
        })
        .integer(),
    })
    .unknown(true),

  login: joi
    .object({
      userEmail: joi.string().required().email(),
      userPassword: joi.string().required().min(6).max(16),
    })
    .unknown(true),
};
module.exports = userSchema;
