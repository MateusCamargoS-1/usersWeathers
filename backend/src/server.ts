import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";
import weatherRoutes from "./routes/weatherRoutes";
import { setupSwagger } from "./config/swagger";
import setupDataBase from "./database/setup";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/users', userRoutes);
app.use('/weather', weatherRoutes);

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger em: http://localhost:${PORT}/api-docs`);
    await setupDataBase();
});