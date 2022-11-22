import http from 'k6/http';
import { check } from 'k6';

const userByPageNumber = (pageNumber) => `https://reqres.in/api/users?page=${pageNumber}`

export default function () {
    
    const payload = {
        "name": "sadab",
        "job": "tester"
    };

    let response = http.put(userByPageNumber(2), JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    check(response, {'is username matches': (res) => res.json().name === payload.name});
}