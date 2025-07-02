import api from './api';

export const getWeatherByCity = async (cidade: string) => {
  const response = await api.get(`/weather/${cidade}`);
  return response.data;
};
