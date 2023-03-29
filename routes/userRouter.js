const Router = require("express").Router();
const user = require("../controllers/userController");

Router.post("/signup", user.signUp);
Router.post("/login", user.logIn);



module.exports = Router;
