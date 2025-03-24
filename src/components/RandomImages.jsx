import { useEffect, useState, useRef, useCallback } from 'react';
import { getRandomPhotos } from '../api/privateApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, loadLikes } from '../store/likeSlice';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { motion } from 'framer-motion';

const RandomImages = () => {
  const dispatch = useDispatch();
  const likedImages = useSelector((state) => state.likes.likedImages);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const observer = useRef();

  // Debug uchun konsolga ma'lumotlar chiqaramiz
  console.log('Reduxdagi liked images:', likedImages);
  console.log('Joriy photos state:', photos);

  // Birinchi marta yuklash
  useEffect(() => {
    dispatch(loadLikes());
    fetchPhotos();
  }, [dispatch]);

  // Rasmlarni yuklash funksiyasi
  const fetchPhotos = useCallback(async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Rasmlarni yuklash, sahifa ${page}...`);
      const data = await getRandomPhotos(10);
      
      console.log('API dan kelgan ma\'lumot:', data);
      
      if (!data || !Array.isArray(data)) {
        throw new Error('API noto\'g\'ri formatda javob qaytardi');
      }

      if (data.length === 0) {
        throw new Error('API hech qanday rasm qaytarmadi');
      }

      setPhotos(prevPhotos => {
        // Yangi rasmlarni qo'shamiz (faqat yangi ID lilarini)
        const newPhotos = data.filter(newPhoto => 
          !prevPhotos.some(photo => photo.id === newPhoto.id)
        );
        return [...prevPhotos, ...newPhotos];
      });
      
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Rasmlarni yuklashda xato:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  // Cheksiz skroll uchun observer
  const lastPhotoRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('Yangi rasmlar yuklanmoqda...');
        fetchPhotos();
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loading, fetchPhotos]);

  // Like bosilganda
  const handleLike = (id) => {
    console.log('Like bosildi, rasm ID:', id);
    dispatch(toggleLike(id));
  };

  // Xato yuz berganda ko'rsatiladigan komponent
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h3 className="text-red-500 text-lg mb-2">Xatolik yuz berdi!</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchPhotos}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Qayta Urinish
        </button>
      </div>
    );
  }

  // Yuklanayotganda ko'rsatiladigan skeleton loader
  if (loading && photos.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Asosiy render qismi
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 1;
          const isLiked = likedImages.includes(photo.id);
          
          // Har bir rasm uchun motion effektlari
          return (
            <motion.div
              key={`${photo.id}-${index}`}
              ref={isLast ? lastPhotoRef : null}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Rasm yoki placeholder */}
              {photo.urls?.regular ? (
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description || 'Unsplash rasm'}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Rasm+Yuklanmadi';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Rasm yuklanmadi
                </div>
              )}
              
              {/* Like tugmasi */}
              <motion.button
                onClick={() => handleLike(photo.id)}
                className="absolute top-2 right-2 bg-white/80 rounded-full p-2 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isLiked ? (
                  <AiFillLike className="text-red-500 text-xl" />
                ) : (
                  <AiOutlineLike className="text-xl" />
                )}
              </motion.button>
              
              {/* Rasm egasi haqida ma'lumot */}
              {photo.user?.name && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-sm truncate">
                  {photo.user.name}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Yuklanayotganda spinner */}
      {loading && photos.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default RandomImages;