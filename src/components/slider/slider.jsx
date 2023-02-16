import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import 'swiper/css/scrollbar';
import 'swiper/css';
import './slider.css';

export const Slider = (props) => {
  const [activeImage, setActiveImage] = useState(0);
  const thumbCount = 5;
  const scrollParams =
    props.booksImage.length > thumbCount
      ? {
          hide: false,
          draggable: true,
          dragSize: 190,
        }
      : false;

  return props.view === 'circles' ? (
    <Swiper className='slider' spaceBetween={8} slidesPerView={props.booksImage.length}>
      {props.booksImage.map((image, index) => (
        <SwiperSlide
          data-test-id='slide-mini'
          key={image}
          onClick={() => {
            setActiveImage(index);
            props.setActiveBookImage(index);
          }}
        >
          <div
            className={
              activeImage === index
                ? 'sliderActiveCircle swiper-pagination-bullet'
                : 'sliderCircle swiper-pagination-bullet'
            }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Swiper
      className='slider'
      scrollbar={scrollParams}
      modules={[Scrollbar]}
      spaceBetween={30}
      slidesPerView={5}
      watchSlidesProgress={true}
    >
      {props.booksImage.map((url, index) => (
        <SwiperSlide
          data-test-id='slide-mini'
          key={url}
          className={activeImage === index ? 'activeImage' : 'sliderImage'}
          onClick={() => {
            setActiveImage(index);
            props.setActiveBookImage(index);
          }}
        >
          <img className='swiper-slide-visible' src={`https://strapi.cleverland.by${url}`} alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
