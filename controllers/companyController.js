const companySchema = require("../models/companySchema");
const reviewSchema = require("../models/reviewSchema");
const cloudinary = require("../services/couldinary");
const { unlinkSync } = require("fs");

const addCompany = async (req, res) => {
  const companyData = new companySchema(req.body);
  try {
    const isCompanyExists = await companySchema.findOne({
      companyName: req.body.companyName,
    });
    if (isCompanyExists) {
      req.file ? unlinkSync(req.file.path) : null // Delete multer unnecessary uploaded photo
      res.status(409).json({
        success: false,
        message: "Company is already registered with this name",
      });
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${companyData._id}_${Date.now()}_CompanyPIC`,
      });
      // console.log(result);
      companyData.companyPic = result.url;
      companyData.userId = req.user._id;
      await companyData.save();
      res.status(201).json({
        success: true,
        message: "Company is registered successfully",
        data: companyData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const companyList = async (req, res) => {
  // console.log(req.query.search);
  const companyListData = await companySchema
    .find({
      $or: [
        { companyName: { $regex: req.query.search, $options: "i" } },
        { companyLocation: { $regex: req.query.search, $options: "i" } },
        { companyCity: { $regex: req.query.search, $options: "i" } },
      ],
    })
    .sort({ companyName: req.query.sorting });
  try {
    res.status(201).json({
      success: true,
      message: "Company list fetched successfully",
      data: companyListData,
      Searchdata: companyListData.length,
      userDetails: req.user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const updateData = await companySchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updateData) {
      res.status(202).json({
        success: true,
        message: "Company details updated successfully",
      });
    }else{
      res.status(404).json({
        success : false,
        message : "Comapany not found"
      })
    }
  } catch (err) {
    res.status(400).json({
      massage: `Error occur ${err.message}`,
    });
  }
};

const deleteCompany = async (req, res) => {
  const companyDelete = await companySchema.findByIdAndDelete(req.params.id);
  try {
    if (companyDelete) {
      res.status(202).json({
        success: true,
        message: "Company deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const companyDetails = async (req, res) => {
  try {
    const companyData = await companySchema.findById(req.params.id);
    const reviewDataList = await reviewSchema
      .find({ companyId: req.params.id })
      .populate({ path: "userId", select: "userName profilePic" });
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

module.exports = {
  addCompany,
  updateCompany,
  companyList,
  deleteCompany,
  companyDetails,
};
