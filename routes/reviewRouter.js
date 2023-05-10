const reviewRouter = require('express').Router()
const review = require('../controllers/reviewController')

reviewRouter.post('/addreview/:cid', review.addReview)
reviewRouter.get('/reviewdetail/:id', review.reviewDetails)
reviewRouter.get('/reviews', review.allReview)

module.exports = reviewRouter