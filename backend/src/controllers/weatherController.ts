import { Request, Response } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';


dotenv.config();

const cache = new NodeCache({ stdTTL: 600 });

export const getWeatherByCity = async (req: Request, res: Response) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city || !apiKey) {
    res.status(400).json({ message: 'Cidade ou chave da API inválida.' });
    return;
  }

  const cacheKey = `weather-${city.toLowerCase()}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    res.json({ cached: true, data: cachedData });
    return;
  }

  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
      params: {
        key: apiKey,
        q: city,
        days: 1,
        aqi: 'no',
        alerts: 'yes',
        lang: 'pt'
      }
    });

    const data = response.data;
    cache.set(cacheKey, data);

    res.json({ cached: false, data });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter dados do clima.', error: error.message });
  }
};