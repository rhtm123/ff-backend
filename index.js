var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const builderRoutes = require('./routes/builderRoutes');
const societyRoutes = require('./routes/societyRoutes');
const memberRoutes = require('./routes/memberRoutes');
const wingRoutes = require('./routes/wingRoutes');
const flatRoutes = require('./routes/flatRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const ownerFamilyRoutes = require('./routes/ownerFamilyRoutes');
const tenantFamilyRoutes = require('./routes/tenantFamilyRoutes');









// other codes 
const connectDB = require('./db');

connectDB();

app.use('/api/builders', builderRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/wings', wingRoutes);
app.use('/api/flats', flatRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/ownerFamilys', ownerFamilyRoutes);
app.use('/api/tenantFamilys', tenantFamilyRoutes);










app.get('/', function(req, res){
   res.send("Hello world!");
});

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});