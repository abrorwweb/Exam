import axios from "axios";


const BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
console.log("Access Key:", ACCESS_KEY);;


if (!ACCESS_KEY) {
  console.error("API kaliti topilmadi! Iltimos, .env faylga kiriting.");
}


const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});


export const getRandomPhotos = async (count = 30) => {
  try {
    const response = await privateApi.get(`/photos/random`, {
      params: { count },
    });
    return response.data;
  } catch (error) {
    console.error("API Xatolik:", error.response ? error.response.data : error.message);
    return [];
  }
};

export default privateApi;
