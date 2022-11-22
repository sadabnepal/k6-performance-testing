import http from 'k6/http';
import { check } from 'k6';

const url = "https://reqres.in/api/users"

export default function () {

    const payload = {
        "name": "sadab",
        "job": "tester"
    };

    let response = http.post(url, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    check(response, {'is name matches': (res) => res.json().name === payload.name});
    check(response, {'is job matches': (res) => res.json().job === payload.job});
}