// src/pages/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Komponent yuklanganda tasodifiy rasmlarni olish
  useEffect(() => {
    const fetchRandomImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.media.com/zh/kurateafiner_parse12", {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // API kaliti
          },
        });
        setImages(response.data.photos); // Ma'lumotlarni saqlash
      } catch (error) {
        setError("Failed to fetch images. Please try again later.");
        console.error("Error fetching random images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomImages();
  }, []);

  // Rasmlarni qidirish funksiyasi
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      if (query.trim() === "") {
        // Agar qidiruv maydoni bo'sh bo'lsa, tasodifiy rasmlarni ko'rsatish
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.media.com/zh/kurateafiner_parse12", {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // API kaliti
          },
        });
        setImages(response.data.photos);
      } else {
        // Qidiruv natijalarini olish
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.media.com/zh/kurateafiner_parse12", {
          params: { query },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // API kaliti
          },
        });
        setImages(response.data.photos);
      }
    } catch (error) {
      setError("Failed to fetch images. Please try again later.");
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-[1200px] m-auto">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Home;