const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route to list models
router.get('/list-models', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: 'Google API key not set in environment variables' });
        }

        // Google Generative Language API expects the API key as a query parameter
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
            timeout: 30000,  
        });

        if (response.status === 200) {
            res.status(200).json(response.data);
        } else {
            res.status(response.status).json({ message: 'Error fetching models' });
        }

    } catch (error) {
        console.error('Error fetching models:', error.response?.data || error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
