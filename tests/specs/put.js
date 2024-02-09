import http from 'k6/http';
import { check } from 'k6';
import { REQ_RES_USERS } from '../config/urls.js';

const userByPageNumber = (pageNumber) => `${REQ_RES_USERS}/${pageNumber}`;

export default function () {
    
    const payload = {
        name: "saqib"
    };

    let response = http.put(userByPageNumber(2), JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    check(response, {'is username matches': (res) => res.json().name === payload.name});
}