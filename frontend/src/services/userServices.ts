import { User } from '@/types/UserType';
import api from './api';

export interface UsersResponse {
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const getUsers = async (
  name = '',
  email = '',
  page = 1,
  limit = 10
): Promise<UsersResponse> => {
  const response = await api.get('/users', {
    params: {
      name,
      email,
      page,
      limit,
    },
  });

  return response.data;
};

export const createUser = async (user: { name: string; email: string }) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data; 
};

export const updateUser = async (id: string, data: { name: string }) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};


