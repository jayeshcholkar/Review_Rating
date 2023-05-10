const reviewSchema = require("./reviewSchema");

module.exports = {
  validateReview: (req, res, next) => {
    const value = reviewSchema.reviewValidate.validate(req.body);
    if (value.error) {
      res.json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
