import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const SwiperSlider = ({ images, slidesPerView = 1, loop = true }) => {
  return (
    <Swiper
      pagination={{ clickable: true }}  // Keep pagination if you want it
      loop={loop}
      modules={[Pagination]}
      slidesPerView={slidesPerView}
      className="mySwiper w-full"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
