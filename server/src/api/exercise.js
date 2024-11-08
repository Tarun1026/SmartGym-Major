// Import the necessary modules
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path to your User model

// Route to get exercise recommendations by user ID
router.get('/user/:userId/exercise-recommendation', async (req, res) => {
    try {
        // Get the user ID from the route params
        const { userId } = req.params;

        // Find the user by their ID
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the exercise recommendation field
        res.status(200).json(user.exerciseRecommendation);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
