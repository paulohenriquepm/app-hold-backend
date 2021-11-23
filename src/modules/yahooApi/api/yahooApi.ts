import axios, { AxiosInstance } from 'axios';

class YahooApi {
  initialize(): AxiosInstance {
    const yahooApi = axios.create({
      baseURL: 'https://query1.finance.yahoo.com/v10/finance/quoteSummary',
    });

    return yahooApi;
  }
}

export { YahooApi };
