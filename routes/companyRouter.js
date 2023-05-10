const companyRouter = require('express').Router()
const company = require('../controllers/companyController') 
const upload = require('../middleware/multer')
const validateToken = require('../middleware/validateToken')

companyRouter.use(validateToken) // do this for using validation for all routes
companyRouter.post("/addcompany", upload.single('companyPic'), company.addCompany)
companyRouter.patch("/updatecompany/:id", company.updateCompany)
companyRouter.delete("/deletecompany/:id", company.deleteCompany)
companyRouter.get("/companylist", company.companyList)

module.exports = companyRouter
