const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "userData",
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "companyData",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
reviewSchema.set("timestamps", true);

module.exports = mongoose.model("reviewData", reviewSchema);
