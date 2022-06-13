import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import domain from './domain.json';

// http://127.0.0.1:8000
// https://toronto.simple2b.net

export const instance = (
  make: string | number,
  model: string | number,
  year: string | number,
  gasType: string | number,
  distance: string | number,
  town: string | number
) => {
  console.log('To backend - ', make, model, year, gasType, distance, town);
  // const token = localStorage.getItem("token") ?? "";

  return axios.create({
    // Authorization: `Bearer ${token}`,
    baseURL: domain.REACT_NATIVE_DOMAIN,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
    params: {
      make,
      model,
      year,
      gasType,
      distance,
      town
    },
  });
}

export const authInstance = axios.create({
  baseURL: domain.REACT_NATIVE_DOMAIN,
  headers: {
    "Content-Type": "multipart/form-data",
    // 'Access-Control-Allow-Origin' : '*',
  },
});
