const { pollStatus } = require('../client');
const request = require('supertest');
let expect;

// Dynamically import chai
before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});

// Import the Express application for testing
const app = require('../server.js');

/**
 * Integration tests for the Status API.
 */
describe('Status API Integration Test', () => {
    let server;

    /**
     * Start the server before running tests.
     * @param {function} done - Callback to indicate completion.
     */
    before((done) => {
        server = app.listen(3000, done); // Start the server before tests
    });

    /**
     * Close the server after tests are completed.
     * @param {function} done - Callback to indicate completion.
     */
    after((done) => {
        server.close(done); // Close the server after tests
    });

    /**
     * Test to ensure the initial status is 'pending'.
     * @returns {Promise<void>} - Resolves when the test is complete.
     */
    it('should return initial status as pending', async () => {
        const response = await request(server).get('/status');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('result', 'pending');
    });

    /**
     * Test to verify the status eventually returns 'completed' or 'error'.
     * Uses polling with exponential backoff to check status.
     * @returns {Promise<void>} - Resolves when the test is complete.
     * @throws {Error} - If the polling does not return expected results.
     */
    it('should eventually return completed or error', async function () {
        this.timeout(12000); // Set timeout for the test
        
        // Use pollStatus with exponential backoff
        const result = await pollStatus('http://localhost:3000/status', {
            interval: 1000,
            retries: 5,
            timeout: 2000
        });
        
        expect(result).to.be.oneOf(['completed', 'error']);
    });
});
