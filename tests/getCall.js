import http from 'k6/http';
import { check, sleep } from 'k6';

const userByPageNumber = (pageNumber) => `https://reqres.in/api/users?page=${pageNumber}`

export default function () {
  let response = http.get(userByPageNumber(2));
  sleep(1);
  check(response, { 'is total record count': (res) => res.json().total === 12 });
}