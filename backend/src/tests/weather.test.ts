import request from 'supertest';
import { Server } from 'http';
import express from 'express';
import weatherRoutes from '../routes/weatherRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

let app: express.Express;
let server: Server;

beforeAll(() => {
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/weather', weatherRoutes);

  server = app.listen(0);
});

afterAll((done) => {
  server.close(done);
});

describe('Testa rota GET /weather/:city', () => {
  it('Retorna dados climáticos para cidade válida', async () => {
    const res = await request(app).get('/weather/São Paulo');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('location');
    expect(res.body.data).toHaveProperty('current');
    expect(res.body.data).toHaveProperty('forecast');
  });

  it('Utiliza cache na segunda chamada', async () => {

    await request(app).get('/weather/Rio de Janeiro');

    const res = await request(app).get('/weather/Rio de Janeiro');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('cached', true);
  });

  it('Retorna erro para cidade inválida', async () => {
    const res = await request(app).get('/weather/invalidcitytest99999');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message', 'Erro ao obter dados do clima.');
  });
});
