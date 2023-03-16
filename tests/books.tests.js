const request = require("supertest");
const app = require("../app");
const { faker } = require("@faker-js/faker");

let server;

beforeAll((done) => {
  server = app.listen(process.env.APP_PORT, () => {
    console.log(`Books Server is running on port ${process.env.APP_PORT}`);
    done();
  });
});
// Test the POST api for adding a book
describe("POST /api/books/add", () => {
  it("should return 201 status code for each case", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await request(app)
        .post("/api/books/add")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
        )
        .send({
          title: faker.name.fullName() + faker.internet.domainWord(),
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("message", "Book created successfully");
    }
  });
});

// Test the GET api for getting all books
describe("GET /api/books", () => {
  it("should return 200 status code and array of books", async () => {
    const res = await request(app)
      .get("/api/books")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("books");
    expect(res.body.books.length).toBeGreaterThan(2);
  });
});

// Test the GET api for getting 5 books
describe("GET /api/books?per_page=5", () => {
  it("should return 200 status code and array of 5 books", async () => {
    const res = await request(app)
      .get("/api/books?per_page=5")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("books");
    expect(res.body.books.length).toEqual(5);
  });
});

// Test the PUT api for updating like
describe("PUT /api/books/like/:id", () => {
  it("should return 200 status code and message", async () => {
    const res = await request(app)
      .put("/api/books/like/dcada338-c9cb-45e4-8b03-637a6e050cb6")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Book liked successfully");
  });
});

// Test the PUT api for failed like testcase
describe("PUT /api/books/like/:id", () => {
  it("should return 400 status code and message", async () => {
    const res = await request(app)
      .put("/api/books/like/dcada338-c9cb-45e4-8b03-637a6e050cb6")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "You have already liked this book"
    );
  });
});

// Test the PUT api for updating dislike
describe("PUT /api/books/unlike/:id", () => {
  it("should return 200 status code and message", async () => {
    const res = await request(app)
      .put("/api/books/unlike/dcada338-c9cb-45e4-8b03-637a6e050cb6")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Book unliked successfully");
  });
});

// Test the PUT api when unliking a book that is not liked
describe("PUT /api/books/unlike/:id", () => {
  it("should return 400 status code and message", async () => {
    const res = await request(app)
      .put("/api/books/unlike/dd8126eb-190a-493e-9a4d-12e5adb34229")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyOGI0NGM5LTg1M2QtNDgyMC1hNjYxLTUxZmY3YzIxNDExNSIsImlhdCI6MTY3ODk4MjM0MSwiZXhwIjoxNjc5MDY4NzQxfQ.lGihbMRyU11jk15whsDENASyUEpc7dd0N-IXyz6Bzkc"
      );
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "You have not liked this book");
  });
});

afterAll(async () => {
  await server.close();
});
