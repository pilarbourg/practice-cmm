const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enables cross-origin requests

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Sample route for home
app.get('/', (req, res) => {
  res.send('This works!');
});

// Route to fetch the form data (reading from local .json file for now)
app.get('/api/get-form-data', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'json', 'simple-search-data.json'); // Ensure correct path

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Error reading form data" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// Mock endpoint to receive form submission
app.post("/api/submit-form", (req, res) => {
  console.log("Received form data:", req.body);
  
  // Simulate successful submission response
  res.json({ message: "Form received successfully!", receivedData: req.body });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});