# Performance Simpler Approach using K6
This framework requires almost no coding, as long as the load profile follows the [accepted format](#usage). That said, some [minor script adjustments](#adjusting-the-script) are still needed.


## Project Structure

- `load_profile.json`: Defines the endpoints and load profile for the performance tests.
- `test_script.js`: K6 test script that reads the load profile and executes the tests.

## Usage

**Update `load_profile.json` with your endpoints and expected results:**

```json
{
    "steps": [
        {
            "name": "getPosts",                                         // Test scenario's name
            "location": "us-west-2",                                    // The location of requests sent from
            "endpoint": {
                "url": "https://jsonplaceholder.typicode.com/posts",    // The URL under test
                "method": "GET",                                        // The method to call the API with
                "params": {},                                           // The request's payload
                "headers": {},                                          // Any required headers
                "expectedStatusCodes": [                                // A list of accepted status codes
                    200
                ]
            },
            "vus": 1,                                                   // The number of parallel Virtual Users
            "iterations": 10,                                           // The number of requests per VU
            "expectedResponseTime": 50                                  // Maximum response time
        }
    ]
}
```


## Adjusting the Script

The script needs to be adjusted to include functions for each step defined in your `load_profile.json`. You need to add and export functions for each step in your `test_script.js`.

Example:
```js
export function getPosts() {
    executeStep('getPosts');
}

export function createPost() {
    executeStep('createPost');
}

export function getComments() {
    executeStep('getComments');
}
```

## Output
The test results will be displayed in the console, including:

- Status checks and response times for each request.
- Detailed information on any failed requests, including status codes and response times.
