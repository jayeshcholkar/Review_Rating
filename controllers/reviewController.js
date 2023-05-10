const reviewSchema = require("../models/reviewSchema");

const createReview = async (req, res) => {
  const reviewData = new reviewSchema(req.body);
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

const deleteReview = async (req, res) => {
  const findReview = await reviewSchema.findById(req.params.id);
  const createdAt = new Date(findReview.createdAt);
  const now = new Date();
  const ageInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24)); //we convert the number of milliseconds to days using the Math.floor()
  // console.log( now -  createdAt ) //resulting in the number of milliseconds that have elapsed between the two times.
  try {
    if (ageInDays >= 7) {
      const reviewDelete = await reviewSchema.findByIdAndDelete(req.params.id);
      if (reviewDelete) {
        res.status(202).json({
          success: true,
          message: `Review deleted successefully`,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Review not found`,
        });
      }
    } else {
      res.status(409).json({
        success: false,
        message: `Review is too new to delete`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewData = await reviewSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (reviewData) {
      res.status(202).json({
        success: true,
        message: "Review is updated successfully",
        updatedReview: reviewData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Review is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error occur ${err.message}`,
    });
  }
};

const reviewList = async (req, res) => {
  try {
    const listReview = await reviewSchema.find();
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

const reviewDetails = async (req, res) => {
  try {
    const listReview = await reviewSchema.findById(req.params.id);
    res.status(201).json({
      success: true,
      message: "Here is the details of review",
      Review: listReview,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: `Reviews not found ${error.message}`,
    });
  }
};

module.exports = {
  deleteReview,
  createReview,
  reviewList,
  updateReview,
  reviewDetails,
};
