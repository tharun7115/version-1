const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Fixed typo
const userRoutes = require('./routes/usersRoutes');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/users', userRoutes); // Route prefix

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
