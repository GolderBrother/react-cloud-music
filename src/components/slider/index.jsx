import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { SliderContainer } from "./style";
function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList = [] } = props;
  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const sliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);
  return (
    <SliderContainer>
    {/* 背景红色遮罩 */}
    <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList && Array.isArray(bannerList) && 
            bannerList.map((slider = {}, index) => (
              <div className="swiper-slide" key={slider.imageUrl + index}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}

export default Slider;
