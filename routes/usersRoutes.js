const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Import model

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the password is correct
    if (foundUser.password !== password) {
        return res.status(400).json({ message: 'Password is incorrect' });
    }

    res.status(200).json({ message: 'Login successful' });
});


module.exports = router;
