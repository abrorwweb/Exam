import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY || 'your_default_key_here';

const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
    'Accept-Version': 'v1',
  },
  timeout: 10000,
});

export const getRandomPhotos = async (count = 10) => {
  try {
    console.log('API so\'rovi boshlandi...');
    const response = await privateApi.get(`/photos/random`, {
      params: {
        count,
        orientation: 'landscape',
      },
    });
    
    console.log('API javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('API xatosi:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error('Rasmlarni yuklab bo\'lmadi: ' + error.message);
  }
};

export default privateApi;