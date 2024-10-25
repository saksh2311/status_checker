const { pollStatus } = require('../client');
const request = require('supertest');
let expect;

// Dynamically import chai
before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});

const app = require('../server.js');

describe('Status API Integration Test', () => {
    let server;

    before((done) => {
        server = app.listen(3000, done); // Start the server before tests
    });

    after((done) => {
        server.close(done); // Close the server after tests
    });

    it('should return initial status as pending', async () => {
        const response = await request(server).get('/status');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('result', 'pending');
    });

    it('should eventually return completed or error', async function () {
        this.timeout(12000);
        
        // Use pollStatus with exponential backoff
        const result = await pollStatus('http://localhost:3000/status', {
            interval: 1000,
            retries: 5,
            timeout: 2000
        });
        
        expect(result).to.be.oneOf(['completed', 'error']);
    });
});
