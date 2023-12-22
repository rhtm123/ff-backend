var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const builderRoutes = require('./routes/builderRoutes');
const societyRoutes = require('./routes/societyRoutes');



// other codes 
const connectDB = require('./db');

connectDB();

app.use('/api/builders', builderRoutes);
app.use('/api/societies', societyRoutes);



app.get('/', function(req, res){
   res.send("Hello world!");
});

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});