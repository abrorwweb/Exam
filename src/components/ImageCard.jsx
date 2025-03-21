// src/components/ImageCard.jsx
import { useState } from "react";
import { saveAs } from "file-saver";

const ImageCard = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Rasmni yuklab olish funksiyasi
  const handleDownload = () => {
    saveAs(image.src.original, `pexels_${image.id}.jpg`); // Rasmni fayl sifatida saqlash
  };

  // Rasmni like qilish funksiyasi
  const handleLike = () => {
    const savedLikes = JSON.parse(localStorage.getItem("likedImages")) || [];
    if (!savedLikes.some((likedImage) => likedImage.id === image.id)) {
      savedLikes.push(image);
      localStorage.setItem("likedImages", JSON.stringify(savedLikes));
    }
  };

  return (
    <div
      className="card bg-base-100 shadow-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure>
        <img src={image.src.medium} alt={image.photographer} className="w-full h-64 object-cover" />
      </figure>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between p-4">
          <button onClick={handleLike} className="btn btn-primary">
            Like
          </button>
          <button onClick={handleDownload} className="btn btn-secondary">
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCard;