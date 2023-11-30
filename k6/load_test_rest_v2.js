import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
    stages: [
        { duration: "30s", target: 100 },
        { duration: "1m", target: 500 },
        { duration: "30s", target: 0 },
    ],
};

const BASE_URL = "http://localhost:3002/products";
const PRODUCT_ID = 1;

export default function () {
    let response = http.get(BASE_URL);
    checkResponse(response);

    response = http.get(`${BASE_URL}/${PRODUCT_ID}`);
    checkResponse(response);

    sleep(1);
}

function checkResponse(response) {
    check(response, {
        "status was 200": (r) => r && r.status === 200,
        "response body is not empty": (r) => r && r.body && r.body.length > 0,
    });
}
