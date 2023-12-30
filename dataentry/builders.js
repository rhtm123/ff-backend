
// const { Builder } = require('./models/builderModel'); // Assuming you have a 'Builder' model

const Builder = require('../models/builderModel');


// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();
// Sample data to populate the database
const buildersData = [
//   {
//     name: 'Builder 1',
//     website: 'http://builder1.com',
//     ffrating: 4.5,
//     contact: '123-456-7890',
//     email: 'builder1@example.com',
//   },
//   {
//     name: 'Builder 2',
//     website: 'http://builder2.com',
//     ffrating: 4.0,
//     contact: '987-654-3210',
//     email: 'builder2@example.com',
//   },
  // Add more data as needed
];

// Function to insert data into the 'builders' collection
const insertBuildersData = async () => {
  try {
    // Insert the sample data into the 'builders' collection
    await Builder.insertMany(buildersData);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Disconnect from MongoDB after inserting data
    mongoose.disconnect();
  }
};

// Call the function to insert data
insertBuildersData();
