
# Status Checker

This project simulates a server that processes jobs and returns their status. The client library provides an efficient way to poll the server to check the status of the job without overwhelming the server with too many requests.

## Features
- Simulates a long-running job on the server.
- Efficient polling mechanism to check the job's status with customizable intervals and retries.
- Returns `pending`, `completed`, or `error` as the job status.

## Prerequisites
- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- `axios` and `express` packages (installed via `npm`)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd status-checker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

To start the server, run the following command:
```bash
node server.js
```
You should see output like:
```bash
Server running on port 3000
```

## Client Polling

The client polls the server to check the status of the job.You can customize the polling interval and number of retries by editing the `config.json` file.

To start polling the server, run:
```bash
node index.js
```
The client will make repeated requests to `/status` based on the configuration set in `config.json` until the job is either `completed` or an `error` occurs.

## Configuration
You can configure the polling behavior in the `config.json` file. Here is an example of the configuration:
```javascript
{
    "interval": 1000,  // Time between retries (in milliseconds)
    "retries": 5,      // Maximum number of retries
    "timeout": 2000    // Timeout for each request (in milliseconds)
}
```
For example, if you want to set the `interval` to 1500 (1.5 seconds) and increase the `retries` to 10, this configuration would make the client wait 1.5 seconds between each polling attempt, allow up to 10 retries, and set a 3-second timeout for each request. This setup can be beneficial when dealing with slower servers or during high-traffic times, helping to ensure that requests have enough time to complete without overwhelming the server.

## Testing

To run the integration tests and ensure everything is working as expected, use the following command:
```bash
npm test
```

## API Endpoints

### `GET /status`
- **Description**: Returns the current status of the job.
- **Responses**:
  - `{ result: 'pending' }`: The job is still processing.
  - `{ result: 'completed' }`: The job has completed successfully.
  - `{ result: 'error' }`: The job has failed.


## Error Handling

If the maximum number of retries is reached without a successful result (`completed` or `error`), the client will throw an error:

```bash
Error: Max retries reached, no result.
```

You can adjust the retry behavior by changing the `retries` option in the client configuration.