/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QCW8GGECFhxHH4o2lxc1XvcwJchTdDprqspJ3bCOXhO41AcLpFveiUld3VTXdV90wcWESpf57OpOc0jjK15WJhw00KLYUZeno',
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
