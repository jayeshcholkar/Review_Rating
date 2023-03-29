const companySchema = require("../models/companySchema");

const addCompany = async (req, res) => {
  const companyData = new companySchema(req.body);
  // console.log(companyData)
  try {
    const isCompanyExists = await companySchema.findOne({
      companyName: req.body.companyName,
    });
    if (isCompanyExists) {
      res.status(409).json({
        success: false,
        message: "Company is already registered with this name",
      });
    } else {
      const company = await companyData.save();
      res.status(201).json({
        success: true,
        message: "Company is registered successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occur " + error,
    });
  }
};

const companyList = async (req, res) => {
  const companyListData = await companySchema.find();
  res.status(200).json({
    success: true,
    message: "Company list fetched successfully",
    data: companyListData,
  });
};

const updateCompany = async (req, res) => {
  // const data = req.params.id
  // console.log(data)
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
    }
  } catch (err) {
    res.status(400).json({
      massage: "Error occur" + err,
    });
  }
};

const deleteCompany = async (req, res) => {
  const companyDelete = await companySchema.findByIdAndDelete(req.params.id);
  if (companyDelete) {
    res.status(202).json({
      success: true,
      message: "Company deleted successfully",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Company not found",
    });
  }
};


const oneCompany = async(req, res) => {
    // console.log(req.params.id)
    try {
    const companyDetails = await companySchema.findById(req.params.id)
    res.status(202).json({
        success : true ,
        message : "Company details fetched successfully",
        data : companyDetails
    })
} catch(error) {
    res.status(500).json({
        success : false,
        message : "Not found " + error
    })
}
}


module.exports = {
  addCompany,
  updateCompany,
  companyList,
  deleteCompany,
  oneCompany
};
