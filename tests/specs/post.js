import http from 'k6/http';
import { check } from 'k6';
import { REQ_RES_USERS } from '../config/urls.js';

export default function () {

    const payload = {
        name: "sadab",
        job: "tester"
    };

    let response = http.post(REQ_RES_USERS, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    check(response, {'is name matches': (res) => res.json().name === payload.name});
    check(response, {'is job matches': (res) => res.json().job === payload.job});
}