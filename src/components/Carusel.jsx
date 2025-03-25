import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

function Carousel() {
  const images = [
    "https://picsum.photos/800/400?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/400?random=3",
    "https://picsum.photos/800/400?random=4",
    "https://picsum.photos/800/400?random=5",
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full max-w-[1250px] relative"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="relative">
          <img src={src} alt={`Slide ${index + 1}`} className="w-full rounded-lg shadow-lg" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-blue-300 text-[50px] font-bold">
            Carusel
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
