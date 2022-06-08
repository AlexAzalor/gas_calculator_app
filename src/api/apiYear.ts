import axios from 'axios';
import domain from '../api/domain.json';

export const instanceYear = (model: string, make: string) => {
  return axios.create({
    baseURL: "https://toronto.simple2b.net",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
    params: {
      model,
      make
    }
  });
}
