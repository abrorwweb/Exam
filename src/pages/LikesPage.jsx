// src/pages/LikesPage.jsx
import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";

const LikesPage = () => {
  const [likedImages, setLikedImages] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedImages")) || [];
    setLikedImages(savedLikes);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liked Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {likedImages.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default LikesPage;