const { pollStatus } = require('./client');

// Poll the server with custom settings
(async () => {
    const result = await pollStatus('http://localhost:3000/status', {
        interval: 2000,  // Poll every 2 seconds
        retries: 10      // Retry up to 10 times
    });
    console.log('Final Job Status:', result);
})();
