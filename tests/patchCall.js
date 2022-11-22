import http from 'k6/http';
import { check } from 'k6';

const userByPageNumber = (pageNumber) => `https://reqres.in/api/users/${pageNumber}`

export default function () {
    
    const payload = {
        name: "morpheus",
        job: "tester"
    };

    let response = http.patch(userByPageNumber(2), JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response.body);
    check(response, {'is name matches': (res) => res.json().name === payload.name});
    check(response, {'is job matches': (res) => res.json().job === payload.job});
}