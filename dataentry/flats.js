
// const { Builder } = require('./models/builderModel'); // Assuming you have a 'Builder' model

const Flat = require('../models/FlatModel');


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
const flatsData = [
    {
      wingId: "65901ef09c41d7b58c9e9505", // Replace with your actual wingId
      name: "101",
    },
    {
      wingId: "65901ef09c41d7b58c9e9505", // Replace with your actual wingId
      name: "102",
    },
    {
      wingId: "65901ef09c41d7b58c9e9505", // Replace with your actual wingId
      name: "103",
    },
    {
        wingId: "65901ef09c41d7b58c9e9505", // Replace with your actual wingId
        name: "104",
      },
    
      {
        wingId: "65901ef09c41d7b58c9e9505", // Replace with your actual wingId
        name: "105",
      },

      {
        wingId: "65901ef09c41d7b58c9e9505", // Replace with your actual wingId
        name: "106",
      },


    // Add more flats as needed
  ];
  
// Function to insert data into the 'builders' collection
const insertBuildersData = async () => {
  try {
    // Insert the sample data into the 'builders' collection
    await Flat.insertMany(flatsData);

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