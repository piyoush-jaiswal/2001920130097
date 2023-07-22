// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8008;



// Endpoint to handle /numbers route
app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required.' });
  }

  const urls = Array.isArray(url) ? url : [url];
  const validUrls = urls.filter(validateUrl);

  const requests = validUrls.map(fetchData);

  try {
    const responses = await Promise.allSettled(requests);

    const numbers = responses.reduce((mergedNumbers, response) => {
      if (response.status === 'fulfilled') {
        const data = response.value;
        mergedNumbers.push(...data.numbers.filter((num) => !mergedNumbers.includes(num)));
      }
      return mergedNumbers;
    }, []);

    res.json({ numbers: numbers.sort((a, b) => a - b) });
  } catch (error) {
    console.error('Error processing requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to validate a URL
function validateUrl(url) {
  // You can implement your custom validation logic here
  return true;
}

// Helper function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    return { numbers: [] };
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
