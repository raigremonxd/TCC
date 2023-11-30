import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 100 },
    { duration: "1m", target: 1000 },
    { duration: "30s", target: 0 },
  ],
};

const BASE_URL = "http://localhost:3002/products";

export default function () {
  let response = http.get(BASE_URL);

  check(response, {
    "status was 200": (r) => r.status === 200,
    "response body is not empty": (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
