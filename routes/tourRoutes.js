const express = require('express');
const tourControoler = require('../controllers/tourController');

const router = express.Router();

router
  .route('/tour-5-cheap')
  .get(tourControoler.aliasTopTour, tourControoler.getAllTours);

router.route('/tour-stats').get(tourControoler.getTourStats);
router.route('/monthly-plan/:year').get(tourControoler.getMonthlyPlan);

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
