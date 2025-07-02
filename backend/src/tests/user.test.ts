import request from "supertest";
import { Server } from "http";
import express from "express";
import userRoutes from "../routes/userRoutes";
import setupDatabase from "../database/setup";
import cors from "cors";

let app: express.Express;
let server: Server;

beforeAll(async () => {
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/users", userRoutes);

  await setupDatabase();

  server = app.listen(0);
});

afterAll((done) => {
  server.close(done);
});

describe("Testa API Users", () => {
  let createdUserId: string;

  it("POST /users - cria usuário", async () => {
    const res = await request(app).post("/users").send({
      name: "Teste Jest",
      email: "jest@email.com",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Teste Jest");

    createdUserId = res.body.id;
  });

  it("GET /users - lista usuários com filtro", async () => {
    const res = await request(app).get("/users").query({ name: "Teste" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body).toHaveProperty("pagination");
  });

  it("GET /users/:id - busca usuário pelo id", async () => {
    const res = await request(app).get(`/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", createdUserId);
  });

  it("POST /users - falha ao criar com email duplicado", async () => {
    const res = await request(app).post("/users").send({
      name: "Teste Duplicado",
      email: "jest@email.com",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Email já cadastrado.");
  });
});
