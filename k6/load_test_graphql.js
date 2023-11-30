import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 100 },
    { duration: "1m", target: 500 },
    { duration: "30s", target: 0 },
  ],
};

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

const query = JSON.stringify({
  query: `
    query {
      getAll {
        name
        description
        value
      }
    }
  `,
});

const params = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default function () {
  let response = http.post(GRAPHQL_ENDPOINT, query, params);

  check(response, {
    "status was 200": (r) => r && r.status === 200,
    "response body is not empty": (r) => r && r.body && r.body.length > 0,
  });

  sleep(1);
}
