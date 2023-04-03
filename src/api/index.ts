import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  headers: {
    'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use((response) => {
  const token = response.headers['set-cookie'];
  if (token) {
    cookies.set('fetch-access-token', token, { path: '/' });
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.request.use((config) => {
  const token = cookies.get('fetch-access-token');
  if (token) {
    config.headers['fetch-access-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
