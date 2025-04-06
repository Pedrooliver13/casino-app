// Packages
import axios from 'axios';

// Configs
import { storageKeys } from '@/config/storage-keys';

export const httpClient = axios.create({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'https://ap.casino-service.io/api',
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.accessToken);

  if (accessToken) {
    config.headers.set('Authorization', accessToken);
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      localStorage.removeItem(storageKeys.accessToken);
      window.location.href = '/';

      return Promise.reject(error);
    }
  },
);
