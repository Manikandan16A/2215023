const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// API Gateway routes
app.post('/shorten-url', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3001/shorten-url', req.body);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

app.get('/:shortcode', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3001/resolve/${req.params.shortcode}`);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error || err.message });
    }
});

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});
