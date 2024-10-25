const express = require('express');
const app = express();

let jobStatus = 'pending'; // default status

// Set the delay time (in milliseconds) for the job to complete
const JOB_DELAY = 5000; // e.g., 5 seconds

// Function to simulate job completion
setTimeout(() => {
    const randomResult = Math.random() < 0.8 ? 'completed' : 'error'; // 80% chance of success
    jobStatus = randomResult;
}, JOB_DELAY);

// Define the /status endpoint
app.get('/status', (req, res) => {
    res.json({ result: jobStatus });
});

// Do NOT start the server here if you want to test the app
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for testing
