import axios from 'axios';

const BASE_URL = 'https://min-api.cryptocompare.com/data';

const api = axios.create({
  baseURL: BASE_URL,
});

export const cryptoApi = {
  getTopCoins: async (limit = 100) => {
    const response = await api.get(`/top/mktcapfull?limit=${limit}&tsym=USD`);
    return response.data;
  },
  
  getPrices: async (symbols: string[]) => {
    if (symbols.length === 0) return {};
    const response = await api.get(`/pricemultifull?fsyms=${symbols.join(',')}&tsyms=USD`);
    return response.data;
  },
  
  getHistoricalData: async (symbol: string, days = 30) => {
    const response = await api.get(`/v2/histoday?fsym=${symbol}&tsym=USD&limit=${days}`);
    return response.data;
  },
  
  getNews: async () => {
    const response = await api.get(`/v2/news/?lang=EN`);
    return response.data;
  }
};
