const userRouter = require("express").Router();
const upload = require('../middleware/multer')
const user = require("../controllers/userController");
const validate = require('../validator/userValidate/userValidate')

userRouter.post("/forgotpassword", user.forgotPassword);
userRouter.post("/login", validate.logInValidation, user.logIn);
userRouter.post("/resetpassword/:id/:token", user.resetPassword);
userRouter.post("/signup", upload.single('profilePic'), validate.singUpValidation, user.signUp);

module.exports = userRouter;
