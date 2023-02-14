import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    withCredentials: true,
  },
});
