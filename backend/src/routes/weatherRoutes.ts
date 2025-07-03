import { Router } from 'express';
import { getWeatherByCity } from '../controllers/weatherController';

const weatherRoutes = Router();

/**
 * @swagger
 * /weather/{city}:
 *   get:
 *     summary: Retorna informações climáticas de uma cidade.
 *     description: Faz uma requisição externa para obter dados meteorológicos de uma cidade passada como parâmetro na URL.
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da cidade a ser buscada.
 *     responses:
 *       200:
 *         description: Retorna os dados climáticos da cidade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: Porto Alegre
 *                 temperature:
 *                   type: number
 *                   example: 26.5
 *                 description:
 *                   type: string
 *                   example: Céu limpo
 *       400:
 *         description: Cidade não fornecida.
 *       500:
 *         description: Erro ao buscar os dados do clima.
 */

weatherRoutes.get('/:city', getWeatherByCity);

export default weatherRoutes;
