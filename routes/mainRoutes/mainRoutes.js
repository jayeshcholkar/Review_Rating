const router = require("express").Router();
const userRouter = require("../userRouter");
const reviewRouter = require("../reviewRouter");
const companyRouter = require("../companyRouter");
const validateToken = require("../../middleware/validateToken");

router.use("/user", userRouter);
router.use(validateToken); // do this for using validation for all routes
router.use("/review", reviewRouter);
router.use("/company", companyRouter);

module.exports = router;
