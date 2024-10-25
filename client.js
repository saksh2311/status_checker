const axios = require('axios');
const config = require('./config.json'); // Import config for dynamic settings

// Default configuration options with fallback values
const DEFAULT_OPTIONS = {
    interval: config.interval || 1000,
    retries: config.retries || 5,
    timeout: config.timeout || 2000
};

/**
 * Polls the server for status until a final result is received or the maximum number of retries is reached.
 *
 * @async
 * @function pollStatus
 * @param {string} url - The URL of the server endpoint to poll.
 * @param {Object} [options=DEFAULT_OPTIONS] - The polling options.
 * @param {number} options.interval - Time between retries in milliseconds.
 * @param {number} options.retries - Maximum number of retries.
 * @param {number} options.timeout - Timeout for each request in milliseconds.
 * @returns {Promise<string>} The final job status, either 'completed' or 'error'.
 * @throws {Error} Throws an error if the maximum number of retries is reached without a final result.
 */
async function pollStatus(url, options = DEFAULT_OPTIONS) {
    const { interval, retries, timeout } = options;
    let attempt = 0;

    while (attempt < retries) {
        const startTime = Date.now();  // Track response time
        try {
            const response = await axios.get(url, { timeout });
            const responseTime = Date.now() - startTime;
            console.log(`[${new Date().toISOString()}] Attempt ${attempt + 1}, Response time: ${responseTime}ms, Status: ${response.data.result}`);

            // Check if status is 'completed' or 'error'
            if (response.data.result === 'completed' || response.data.result === 'error') {
                return response.data.result;
            }
            
            // Wait before retrying with exponential backoff
            await new Promise(resolve => setTimeout(resolve, interval * Math.pow(2, attempt)));
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Attempt ${attempt + 1} failed: ${error.message}`);
        }

        attempt++;
    }

    throw new Error('Max retries reached without a final result.');
}

module.exports = { pollStatus };
