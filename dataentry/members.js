
// const { Builder } = require('./models/builderModel'); // Assuming you have a 'Builder' model

const Member = require('../models/memberModel');


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
const membersData = [
    {
      username: "rahul_kumar",
      email: "rahul.kumar@example.com",
      name: "Rahul Kumar",
      password: "secure123",
      isOwner: true,
      mobile: "9876543210",
      dateOfBirth: new Date("1988-03-10"),
      gender: "Male",
      role: "member",
      societyId: "658fcc701b2822a6a11e828b", // Replace with your actual societyId
    },
    {
      username: "priya_sharma",
      email: "priya.sharma@example.com",
      name: "Priya Sharma",
      password: "password@123",
      isTenant: true,
      mobile: "8765432109",
      dateOfBirth: new Date("1992-08-22"),
      gender: "Female",
      role: "member",
      societyId: "658fcc701b2822a6a11e828b", // Replace with your actual societyId
    },
    {
      username: "suresh_patel",
      email: "suresh.patel@example.com",
      name: "Suresh Patel",
      password: "mypassword",
      isTenant: true,
      mobile: "7654321098",
      dateOfBirth: new Date("1985-12-05"),
      gender: "Male",
      role: "member",
      societyId: "658fcc701b2822a6a11e828b", // Replace with your actual societyId
    },
    // Add more members as needed
  ];
  
// Function to insert data into the 'builders' collection
const insertBuildersData = async () => {
  try {
    // Insert the sample data into the 'builders' collection
    await Member.insertMany(membersData);

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
