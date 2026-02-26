import request from "supertest";
import { createApp } from "../src/app.js";

describe("API", () => {
  const app = createApp();

  it("returns welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/node-basics/);
  });

  it("creates a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "New" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("New");
  });
});
