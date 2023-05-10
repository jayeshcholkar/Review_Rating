const upload = require('../middleware/multer')
const companyRouter = require('express').Router()
const company = require('../controllers/companyController') 
const { isUser, isAdmin } = require('../middleware/authorization')

companyRouter.get("/list", company.companyList)
companyRouter.get("/details/:id", company.companyDetails)
companyRouter.patch("/update/:id", isAdmin, company.updateCompany)
companyRouter.delete("/delete/:id", isAdmin, company.deleteCompany)
companyRouter.post("/create", upload.single('companyPic'), company.addCompany)

module.exports = companyRouter
