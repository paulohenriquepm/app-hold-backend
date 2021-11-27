import axios from 'axios';

const yahooApi = axios.create({
  baseURL: 'https://query1.finance.yahoo.com/v10/finance/quoteSummary',
});
// class YahooApi {
//   initialize(): AxiosInstance {

//     return yahooApi;
//   }
// }

export { yahooApi };
