import { useEffect, useState, useRef, useCallback } from "react";
import { getRandomPhotos } from "../api/Unplash";
import DownloadButton from "./DownloadButton";

const RandomImages = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);

  
  const fetchPhotos = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const data = await getRandomPhotos(30);
    setPhotos((prevPhotos) => [...prevPhotos, ...data]);

    setLoading(false);
  }, [loading]);

  // Sahifa yuklanganda rasmlar olish
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Oxirgi rasmni kuzatib, yangi rasm yuklash
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetchPhotos]
  );

  return (
    <div
      className="py-10 mx-auto grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridAutoFlow: "dense",
      }}
    >
      {photos.length > 0
        ? photos.map((photo, index) => {
            const uniqueKey = `${photo.id}-${index}`;
            return (
              <div
                ref={index === photos.length - 1 ? lastPhotoRef : null}
                key={uniqueKey}
                className="rounded-lg overflow-hidden shadow-lg relative"
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Unsplash rasm"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
                <DownloadButton
                  url={photo.urls.full}
                  filename={`unsplash-${photo.id}.jpg`}
                />
              </div>
            );
          })
        : Array.from({ length: 10 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full h-32 bg-gray-200 animate-pulse"></div>
          ))}
      {loading && <p className="text-center col-span-3">Yuklanmoqda...</p>}
    </div>
  );
};

export default RandomImages;
