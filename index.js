const { pollStatus } = require('./client');
const config = require('./config.json'); // Import config for dynamic settings

// Poll the server with custom settings
(async () => {
    const result = await pollStatus('http://localhost:3000/status', {
        interval: config.interval,  // Use value from config.json
        retries: config.retries      // Use value from config.json
    });
    console.log('Final Job Status:', result);
})();
