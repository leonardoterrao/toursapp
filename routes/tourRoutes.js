const express = require('express');
const tourControoler = require('../controllers/tourController');

const router = express.Router();

router
  .route('/')
  .get(tourControoler.getAllTours)
  .post(tourControoler.createTour);

router
  .route('/:id')
  .get(tourControoler.getTour)
  .patch(tourControoler.updateTour)
  .delete(tourControoler.deleteTour);

module.exports = router;
