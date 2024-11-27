const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes'); // User routes
const quickScanRoutes = require('./routes/quickScanRoutes'); // QuickScan routes

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Route Prefixes
app.use('/users', userRoutes); 
app.use('/quickScan', quickScanRoutes);


// Database connection
mongoose.connect('mongodb://localhost:27017/users', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});