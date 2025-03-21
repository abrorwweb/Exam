// src/api/pexels.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // .env faylidan olingan API kalit

// Rasmlarni qidirish funksiyasi
export const searchImages = async (query) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query, per_page: 20 }, // Qidiruv so'rovi va sahifadagi rasmlar soni
      headers: { Authorization: API_KEY }, // Pexels API uchun autentifikatsiya
    });
    console.log(response.data); // Ma'lumotlarni konsolga chiqaring
    return response.data.photos; // Qidiruv natijalari
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images. Please try again later.");
  }
};

// Tasodifiy rasmlarni olish funksiyasi
export const getRandomImages = async (count = 10) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/curated", {
      params: { per_page: count }, // Nechta rasm olish
      headers: { Authorization: API_KEY },
    });
    console.log(response.data); // Ma'lumotlarni konsolga chiqaring
    return response.data.photos; // Tasodifiy rasmlar
  } catch (error) {
    console.error("Error fetching random images:", error);
    throw new Error("Failed to fetch random images. Please try again later.");
  }
};