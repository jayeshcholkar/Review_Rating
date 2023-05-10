const reviewSchema = require("../models/reviewSchema");
const companySchema = require("../models/companySchema");

const addReview = async (req, res) => {
  const reviewData = new reviewSchema(req.body);
  console.log(reviewData);
  try {
    reviewData.userId = req.user._id;
    reviewData.companyId = req.params.cid;
    await reviewData.save();
    res.status(200).json({
      success: true,
      message: "Review Added Successfully",
      review: reviewData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const reviewDetails = async (req, res) => {
  const companyData = await companySchema.findById(req.params.id);
  const reviewDataList = await reviewSchema
    .find({ companyId: req.params.id })
    .populate({ path: "userId", select: "userName profilePic" })
  try {
    res.status(200).json({
      success: true,
      message: "Review list fetched successfully",
      company: companyData,
      review: reviewDataList,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Review not found ${error.message}`,
    });
  }
};

const allReview = async (req, res) => {
  const listReview = await reviewSchema.find();
  try {
    res.status(201).json({
      success: true,
      message: "Here is the list of reviews",
      Review: listReview,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: `Reviews not found ${error.message}`,
    });
  }
};

module.exports = { addReview, reviewDetails, allReview };
