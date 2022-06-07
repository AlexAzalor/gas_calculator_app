import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import domain from './domain.json';
// const axios = require('axios').default;

// make: string | number,
// model: string | number,
// year: string | number,
// gasType: string | number,
// distance: string | number,
// town: string | number

// http://127.0.0.1:8000/api/gas_consumption


export const instance = (
  make: string | number | null,
  model: string | number | null,
  year: string | number | null,
  gasType: string | number | null,
  distance: string | number,
  town: string | number
) => {
  console.log('To backend - ', make, model, year, gasType, distance, town);
  // const token = localStorage.getItem("token") ?? "";

  return axios.create({
    // Authorization: `Bearer ${token}`,
    baseURL: "https://toronto.simple2b.net",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
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
