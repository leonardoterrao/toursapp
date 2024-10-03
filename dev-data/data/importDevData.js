const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: 'config.env' });

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then(() => console.log('DB connection successfully!'));

// READ JSON FILE
const tours = fs.readFileSync(`${__dirname}/tours.json`, 'utf8');
const users = fs.readFileSync(`${__dirname}/users.json`, 'utf8');
const reviews = fs.readFileSync(`${__dirname}/reviews.json`, 'utf8');

// IMPORTA DATA INTO DB
const importData = async () => {
  try {
    const toursJson = JSON.parse(tours);
    await Tour.create(toursJson);

    const usersJson = JSON.parse(users);
    await User.create(usersJson, { validateBeforeSave: false });

    const reviewsJson = JSON.parse(reviews);
    await Review.create(reviewsJson);
    console.log('Data imported successfully!');
  } catch (err) {
    console.error('Error importing data', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Review.deleteMany();
    await User.deleteMany();
    await Tour.deleteMany();
    console.log('Data deleted successfully!');
  } catch (err) {
    console.error('Error importing data', err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
