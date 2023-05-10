const userRouter = require("express").Router();
const user = require("../controllers/userController");
const upload = require('../middleware/multer')
const validate = require('../validator/userValidate/userValidate')

userRouter.post("/signup", upload.single('profilePic'), validate.singUpValidation, user.signUp);
userRouter.post("/login", validate.logInValidation, user.logIn);
userRouter.post("/forgotpassword", user.forgotPassword);
userRouter.post("/resetpassword/:id/:token", user.resetPassword);



module.exports = userRouter;
