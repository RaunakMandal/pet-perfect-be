const request = require("supertest");
const app = require("../app");
const { faker } = require("@faker-js/faker");

// Testing the signup route - but only for once
// describe("POST /api/authors/signup", () => {
//   it("should return 201 status code for each case", async () => {
//     for (let i = 0; i < 5; i++) {
//       const res = await request(app)
//         .post("/api/authors/signup")
//         .send({
//           name: faker.name.fullName(),
//           email: faker.internet.email(),
//           phone_no: faker.phone.number(),
//           password: faker.internet.password(10),
//         });
//       expect(res.statusCode).toEqual(201);
//     }
//   });
// });

// Testing the signin route
describe("POST /api/authors/signin", () => {
  it("should return 200 status code and accessToken", async () => {
    const res = await request(app).post("/api/authors/signin").send({
      email: "raunak@test.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});

// Testing the get all authors route
describe("GET /api/authors", () => {
  it("should return 200 status code and array of authors", async () => {
    const res = await request(app)
      .get("/api/authors")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(2);
  });
});

// Testing the get author by id route
describe("GET /api/authors/:id", () => {
  it("should return 200 status code and a single author", async () => {
    const res = await request(app)
      .get("/api/authors/f28b44c9-853d-4820-a661-51ff7c214115")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("phone_no");
  });
});

// Testing the me route - to get the current user
describe("GET /api/authors/me", () => {
  it("should return 200 status code and a single author", async () => {
    const res = await request(app)
      .get("/api/authors/me")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Raunak Mandal");
    expect(res.body).toHaveProperty("email", "raunak@test.com");
    expect(res.body).toHaveProperty("phone_no", "5432543");
  });
});
