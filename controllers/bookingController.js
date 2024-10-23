const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourID);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourID}&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    mode: 'payment',
    line_items: [
      {
        // Need to automate the product/price creation to be used here for each tour.
        price: 'price_1QCWqqGECFhxHH4ovx8TwgxC',
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: 'successs',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // this is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying.
  const { tour, user, price } = req.query;

  if (!tour || !user || !price) {
    return next();
  }
  await Booking.create({ tour, user, price });

  res.redirect(`${req.protocol}://${req.get('host')}/`);
});
