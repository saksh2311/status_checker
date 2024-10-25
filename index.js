const { pollStatus } = require('./client');
const config = require('./config.json'); // Import config for dynamic settings

/**
 * Polls the server for job status with configurable options.
 * 
 * @async
 * @function pollJobStatus
 * @returns {Promise<void>} A promise that resolves when the polling is complete.
 */
(async () => {
    /**
     * The URL of the server status endpoint.
     * @type {string}
     */
    const url = 'http://localhost:3000/status';

    /**
     * Polling options with values from the configuration file.
     * @type {Object}
     * @property {number} interval - Time between polls in milliseconds.
     * @property {number} retries - Maximum number of retry attempts.
     */
    const options = {
        interval: config.interval,  // Use value from config.json
        retries: config.retries      // Use value from config.json
    };

    try {
        const result = await pollStatus(url, options);
        console.log('Final Job Status:', result);
    } catch (error) {
        console.error('Error while polling status:', error.message);
    }
})();
