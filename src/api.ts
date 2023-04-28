import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  const response = await axios.get(`${BASE_URL}/coins`);
  const json = response.data;
  return json;
};

export const fetchCoinInfo = async (coinId:string) => {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
  const json = response.data;
  return json;
};

export const fetchCoinTickers = async (coinId:string) => {
  const response = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  const json = response.data;
  return json;
};

export const fetchCoinHistory = async (coinId:string) => {
  
  const response = await axios.get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`);
  const json = response.data;
  return json;
};


