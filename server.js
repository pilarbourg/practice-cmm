// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files (e.g., your HTML, CSS, and JS)
app.use(express.static(path.join(__dirname, 'public')));

// Sample route for home
app.get('/', (req, res) => {
  res.send('This works!');
});

// Route to fetch the form data (reading from local .json file for now)
app.get('/api/get-form-data', (req, res) => {
  fs.readFile('json/simple-search-data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading form data');
    }
    res.json(JSON.parse(data)); // Respond with the data in the JSON file
  });
});

// Route to handle form submission (POST request)
app.post('/api/submit-form', (req, res) => {
  const formData = req.body; // The data sent by the front-end

  // Here, you can save the data or process it as needed.
  console.log('Received form data:', formData);

  // Simulating a response back to the front-end
  res.json({
    message: 'Form data received successfully',
    formData
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});