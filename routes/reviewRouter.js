const reviewRouter = require("express").Router();
const review = require("../controllers/reviewController");
const validate = require("../validator/reviewValidate/reviewValidation");

reviewRouter.get("/list", review.reviewList);
reviewRouter.get("/detail/:id", review.reviewDetails);
reviewRouter.patch("/update/:id", review.updateReview);
reviewRouter.delete("/delete/:id", review.deleteReview);
reviewRouter.post("/create/:cid", validate.validateReview, review.createReview);

module.exports = reviewRouter;
