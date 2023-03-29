const companyRouter = require('express').Router()
const company = require('../controllers/companyController') 

companyRouter.post("/addcompany", company.addCompany)
companyRouter.patch("/updatecompany/:id", company.updateCompany)
companyRouter.delete("/deletecompany/:id", company.deleteCompany)
companyRouter.get("/company/:id", company.oneCompany)
companyRouter.get("/companylist", company.companyList)

module.exports = companyRouter
