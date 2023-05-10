const joi = require('joi')

const reviewSchema = {
    reviewValidate : joi.object({
        subject : joi.string().required().min(2).max(100),
        review : joi.string().min(2).max(200).required(),
        rating : joi.number().integer().min(1).max(5)
    }).unknown(true)
}
module.exports = reviewSchema
