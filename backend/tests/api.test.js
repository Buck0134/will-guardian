const request = require("supertest");
const app = require("../server");
const db = require("../database/db");

require("dotenv").config();
process.env.NODE_ENV = "test"; // Ensure test mode is active

let token;

beforeAll((done) => {
  // Clear database before running tests
  db.serialize(() => {
    db.run("DELETE FROM users");
    db.run("DELETE FROM wills");
    db.run("DELETE FROM executors");
    db.run("DELETE FROM emails_sent");
    done();
  });
});

describe("Will Guardian API Tests (Isolated from Production)", () => {
  test("Register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User registered successfully");
  });

  test("Login user and get token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test("Upload a will", async () => {
    const response = await request(app)
      .post("/api/will")
      .set("Authorization", `Bearer ${token}`)
      .send({ document: "This is my last will." });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Will saved successfully");
  });

  test("Retrieve will", async () => {
    const response = await request(app)
      .get("/api/will")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.document).toBe("This is my last will.");
  });

  test("Add executor", async () => {
    const response = await request(app)
      .post("/api/executor")
      .set("Authorization", `Bearer ${token}`)
      .send({ executor_email: "executor@example.com" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Executor added successfully");
  });

  test("Retrieve executors", async () => {
    const response = await request(app)
      .get("/api/executors")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Mark user as alive", async () => {
    const response = await request(app)
      .post("/api/alive")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Status updated, you are alive.");
  });

  test("Track email open (No Auth Required)", async () => {
    const response = await request(app)
      .get("/api/track-email/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Email open status recorded.");
  });
});

afterAll((done) => {
  // Close database connection after all tests
  db.close();
  done();
});