import { useEffect, useState, useRef, useCallback } from "react";
import { getRandomPhotos } from "../api/privateApi";
import DownloadButton from "./DownloadButton";

const RandomImages = () => {
  const [image, setImage] = useState([]);
  const [loader, setLoader] = useState(false);
  const observer = useRef();

  const fetchPhotos = useCallback(async () => {
    if (loader) return;
    setLoader(true);
    const data = await getRandomPhotos(30);
    setImage((prevPhotos) => [...prevPhotos, ...data]);
    setLoader(false);
  }, [loader]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const lastPhotoRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loader, fetchPhotos]
  );

  return (
    <div className="py-10 grid grid-cols-3 gap-4">
      {image.length > 0
        ? image.map((photo, index) => {
            if (index === image.length - 1) {
              return (
                <div
                  ref={lastPhotoRef}
                  key={photo.id}
                  className="rounded-md overflow-hidden shadow-lg relative"
                >
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description}
                    className="w-full h-48 object-cover "
                  />
                  <DownloadButton
                    url={photo.urls.full}
                    filename={`unsplash-${photo.id}.jpg`}
                  />
                </div>
              );
            }
            return (
              <div
                key={photo.id}
                className=" rounded-xl hover:rounded-md cursor-pointer overflow-hidden shadow-lg relative transition-transform duration-300 hover:scale-95 hover:rotate-6 hover:shadow-xl"
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  className="w-full h-48 object-cover"
                />
                <DownloadButton
                  url={photo.urls.full}
                  filename={`unsplash-${photo.id}.jpg`}
                />
              </div>
            );
          })
        : Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex w-full flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
            </div>
          ))}
      {loader && <p className="text-center col-span-3">Yuklanmoqda...</p>}
    </div>
  );
};

export default RandomImages;
