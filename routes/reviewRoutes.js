const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authenticationController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .delete(authController.protect, reviewController.deleteReview)
  .patch(authController.protect, reviewController.updateReview);

module.exports = router;
