import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend, Rate } from 'k6/metrics';
// import loadProfile from './load_profile.json';

const loadProfile = JSON.parse(open('./load_profile.json'));
const steps = new SharedArray('steps', () => loadProfile.steps);

// Custom metrics
let http_req_duration_by_group = {};
let http_req_failed_by_group = {};
let http_req_sending_by_group = {};
let http_req_waiting_by_group = {};
let http_req_receiving_by_group = {};

steps.forEach(step => {
    http_req_duration_by_group[step.name] = new Trend(`http_req_duration_${step.name}`);
    http_req_failed_by_group[step.name] = new Rate(`http_req_failed_${step.name}`);
    http_req_sending_by_group[step.name] = new Trend(`http_req_sending_${step.name}`);
    http_req_waiting_by_group[step.name] = new Trend(`http_req_waiting_${step.name}`);
    http_req_receiving_by_group[step.name] = new Trend(`http_req_receiving_${step.name}`);
});

let cumulativeDuration = 0;
const scenarios = steps.reduce((acc, step, index) => {
    acc[step.name] = {
        executor: 'constant-vus',
        vus: step.vus,
        duration: `${step.iterations}s`, // Calculate based on iterations
        startTime: `${cumulativeDuration}s`, // Sequential start times
        exec: step.name,
        tags: { location: step.location },
    };
    cumulativeDuration += step.iterations;
    return acc;
}, {});

export const options = {
    scenarios: scenarios,
};

// Define and export functions for each step
export function getPosts() {
    executeStep('getPosts');
}

export function createPost() {
    executeStep('createPost');
}

export function getComments() {
    executeStep('getComments');
}

function executeStep(stepName) {
    const step = steps.find(s => s.name === stepName);
    group(step.name, function () {
        for (let i = 0; i < step.iterations; i++) {
            logRequest(step.name, __VU, i);
            executeRequest(step.endpoint, step.expectedResponseTime, step.endpoint.expectedStatusCodes, step.name);
            sleep(1); // Small sleep to simulate real-world usage
        }
    });
}

function logRequest(stepName, vu, iteration) {
    const paddedStepName = stepName.padEnd(12, ' ');
    console.log(`${paddedStepName} | VU: ${vu} | Iteration: ${iteration + 1}`);
}

function executeRequest(endpoint, expectedResponseTime, expectedStatusCodes, groupName) {
    let response;
    if (endpoint.method === 'GET') {
        response = http.get(endpoint.url, { headers: endpoint.headers, tags: { group: groupName } });
    } else if (endpoint.method === 'POST') {
        response = http.post(endpoint.url, JSON.stringify(endpoint.params), { headers: endpoint.headers, tags: { group: groupName } });
    }

    // Record metrics
    http_req_duration_by_group[groupName].add(response.timings.duration);
    http_req_failed_by_group[groupName].add(response.status >= 400);
    http_req_sending_by_group[groupName].add(response.timings.sending);
    http_req_waiting_by_group[groupName].add(response.timings.waiting);
    http_req_receiving_by_group[groupName].add(response.timings.receiving);

    // Perform status and response time checks
    check(response, {
        [`${groupName} status is one of ${expectedStatusCodes}`]: (r) => expectedStatusCodes.includes(r.status),
        [`${groupName} response time is < ${expectedResponseTime}ms`]: (r) => r.timings.duration < expectedResponseTime,
    });
}