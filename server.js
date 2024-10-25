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

/**
 * Defines the /status endpoint to get the current job status.
 *
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Sends a JSON response with the job status.
 */
app.get('/status', (req, res) => {
    res.json({ result: jobStatus });
});

// Do NOT start the server here if you want to test the app
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    /**
     * Starts the Express server.
     *
     * @function
     * @param {number} PORT - The port number on which the server will listen.
     * @returns {void} Logs a message indicating the server is running.
     */
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export the app for testing
