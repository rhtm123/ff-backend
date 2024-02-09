var express = require('express');
const cors = require('cors'); // Import the cors middleware

var app = express();

require('dotenv').config(); // Load environment variables from .env file


const cloudinary = require('cloudinary').v2;




cloudinary.config({
    cloud_name: process.env.CLN_CLOUD_NAME,
    api_key: process.env.CLN_API_KEY,
    api_secret: process.env.CLN_API_SECRET,
});


// routes import 
const builderRoutes = require('./routes/builderRoutes');
const societyRoutes = require('./routes/societyRoutes');
const memberRoutes = require('./routes/memberRoutes');
const wingRoutes = require('./routes/wingRoutes');
const flatRoutes = require('./routes/flatRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const ownerFamilyRoutes = require('./routes/ownerFamilyRoutes');
const tenantFamilyRoutes = require('./routes/tenantFamilyRoutes');
const penaltyRoutes = require('./routes/penaltyRoutes');
const ownerPenaltyRoutes = require('./routes/ownerPenaltyRoutes');


const authenticateToken = require('./middleware/authMiddleware');
const complaintRoutes = require('./routes/complaintRoutes');
const contactRoutes = require('./routes/contactRoutes');


// Import the cron job module
require('./cronJob');


// connecting to database
const connectDB = require('./db');
connectDB();







// middleware 
app.use(cors());
// this code is for accepting data in port request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(authenticateToken); // authentication 










// image routes 




// all the routes 
app.use('/api/builders', builderRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/wings', wingRoutes);
app.use('/api/flats', flatRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/ownerFamilies', ownerFamilyRoutes);
app.use('/api/tenantFamilies', tenantFamilyRoutes);
app.use('/api/penalties', penaltyRoutes);
app.use('/api/ownerPenalties', ownerPenaltyRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/contacts', contactRoutes);

// admin routes

// app.use(adminBroApp);








app.get('/', function(req, res){
   res.send("Hello world!");
});



// app.use(admin.options.rootPath, adminRouter)


const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0" ,()=> {
    console.log(`Server is running on http://localhost:${port}`);
});