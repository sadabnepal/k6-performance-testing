import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    iterations: 10,
    vus: 2,
    duration: '30s',
    thresholds: {
        http_req_failed: [
            'rate<0.01', // http errors should be less than 1%
        ],
        http_req_duration: [
            'p(95)<500', // 95% of requests should be below 500ms
        ]
    },
};

export function setup() {
    console.log('Setup function executed');
}

export default function () {
    const response = http.get('https://quickpizza.grafana.com');
    sleep(1);
    check(response, {
        'is status 200': (r) => r.status === 200
    });
}

export function teardown() {
    console.log('Teardown function executed');
}