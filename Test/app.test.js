const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("GooglePlay", () => {
  it("should return a message from GET /", () => {
    return supertest(app).get("/").expect(404);
  });
});

it("should return an array", () => {
  return supertest(app).get("/apps?genre=Casual&sort=app").expect(200);
  expect("Content-Type", /json/).then((res) => {
    // make sure you get an array
    expect(res.body).to.be.an("array");
  });
});

it("should ask for the righ sort type", () => {
  return supertest(app).get("apps");
  query({ key: "" }).expect(
    400,
    "Genre should be one of the following 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'"
  );
});