import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL+'/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
