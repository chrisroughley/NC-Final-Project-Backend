import * as request from "supertest";
// const request = require("supertest")

const baseURL = "https://us-central1-final-project-backend-16738.cloudfunctions.net/app";

describe("GET messages tests", () => {
  test("respond with a 200 OK", () => {
    return request(baseURL)
        .get("/feed")
        .expect(200);
  });
});
