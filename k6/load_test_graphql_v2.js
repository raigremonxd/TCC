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

const queryById = JSON.stringify({
  query: `
    query {
      getById(id: 1) {
        name
        description
        value
      }
    }
  `,
});

const queryGetAll = JSON.stringify({
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
  let responseGetAll = http.post(GRAPHQL_ENDPOINT, queryGetAll, params);

  let responseGetById = http.post(GRAPHQL_ENDPOINT, queryById, params);

  check(responseGetAll, {
    "getAll: status was 200": (r) => r && r.status === 200,
    "getAll: response body is not empty": (r) => r && r.body && r.body.length > 0,
  });

  check(responseGetById, {
    "getById: status was 200": (r) => r && r.status === 200,
    "getById: response body is not empty": (r) => r && r.body && r.body.length > 0,
  });

  sleep(1);
}
