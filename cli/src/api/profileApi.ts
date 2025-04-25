// src/api/profileApi.ts
import { api } from './api';

export const profileApi = {
  getProfile: (userId: number) => api.get(`/users/${userId}`),
  getUserTemplates: (userId: number) => api.get(`/templates?authorId=${userId}`),
  updateProfile: (userId: number, data: { name?: string; email?: string }) =>
    api.patch(`/users/${userId}`, data),
};