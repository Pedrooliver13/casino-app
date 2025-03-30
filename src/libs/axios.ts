// Packages
import axios from 'axios';

export const httpClient = axios.create({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'https://ap.casino-service.io/api',
});

httpClient.interceptors.request.use((config) => {
  const accessToken = null; /* localStorage.getItem(storageKeys.accessToken) */

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});
