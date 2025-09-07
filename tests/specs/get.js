import http from 'k6/http';
import { check, sleep } from 'k6';
import { REQ_RES_USERS } from '../config/urls.js';

const userByPageNumber = (pageNumber) => `${REQ_RES_USERS}?page=${pageNumber}`;

export default function () {
  const response = http.get(userByPageNumber(2));
  sleep(1);
  check(response, { 'is total record count': (res) => res.json().total === 12 });
}