const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/api/supported', async (req, res) => {
    try {
        const response = await axios.get('http://45.88.188.104:6087/api/adlinks/supported');
        const supportedData = response.data;
        res.json(supportedData); // Return supported data as JSON
    } catch (error) {
        console.error('Error fetching supported data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle /api/a/bypass?link=LINK
app.get('/api/bypass', async (req, res) => {
  try {
    const link = req.query.link;
    if (!link) {
      return res.status(400).json({ error: 'Link parameter is required' });
    }

    const response = await axios.get(`http://45.88.188.104:6087/api/adlinks/bypass?url=${link}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
