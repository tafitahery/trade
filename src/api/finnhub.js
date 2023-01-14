import axios from 'axios';

const TOKEN = 'cf17ps2ad3i62koqa3fgcf17ps2ad3i62koqa3g0';

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN,
  },
});
