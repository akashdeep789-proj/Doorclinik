const request = require("supertest");
const app = require("../app");

describe("Auth routes", () => {
  test("signup creates a new patient and redirects", async () => {
    const res = await request(app)
      .post("/patient/signup")
      .type("form")
      .send({
        username: "testuser1",
        email: "testuser1@example.com",
        password: "TestPass123!",
      });

    expect(res.status).toBe(302);
  });

  test("login with correct credentials succeeds", async () => {
    // first create the user
    await request(app)
      .post("/patient/signup")
      .type("form")
      .send({
        username: "loginuser",
        email: "loginuser@example.com",
        password: "TestPass123!",
      });

    const res = await request(app)
      .post("/patient/login")
      .type("form")
      .send({
        username: "loginuser",
        password: "TestPass123!",
      });

    expect(res.status).toBe(302);
    expect(res.headers.location).not.toBe("/patient/login"); // should NOT bounce back to login on success
  });

  test("login with wrong password fails and redirects back to login", async () => {
    await request(app)
      .post("/patient/signup")
      .type("form")
      .send({
        username: "wrongpassuser",
        email: "wrongpassuser@example.com",
        password: "TestPass123!",
      });

    const res = await request(app)
      .post("/patient/login")
      .type("form")
      .send({
        username: "wrongpassuser",
        password: "totallyWrongPassword",
      });

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("/patient/login"); // passport failureRedirect
  });

  test("logout redirects to listings", async () => {
    const res = await request(app).get("/logout");

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("/listings");
  });

  test("doctor signup works independently from patient signup", async () => {
    const res = await request(app)
      .post("/doctor/signup")
      .type("form")
      .send({
        username: "doctoruser1",
        email: "doctoruser1@example.com",
        password: "TestPass123!",
      });

    expect(res.status).toBe(302);
  });
});