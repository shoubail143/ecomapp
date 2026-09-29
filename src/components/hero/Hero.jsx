import React from "react";
import sale from "../../assets/sale.png";
import shoppingbag from "../../assets/shoppingbag.png";
import women from "../../assets/women.png";
//import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "aos/dist/aos.css";

const Photos = [
  {
    id: 1,
    img: sale,
    title: "Upto 25% off on everything you need",
    description:
      "All you need is just a click away don't be late grabs your needs just now!!",
  },
  {
    id: 2,
    img: shoppingbag,
    title: "40% off on Men's wear",
    description: "FLAT sale on Hoodies, Teashirts, Sweetshirts & Manymores!",
  },
  {
    id: 3,
    img: women,
    title: "40% off on Women's wear",
    description: "FLAT sale on Skirts, Lehangas, Sweetshirts & Manymores!",
  },
];

const Hero = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center bg-gray-100 min-h-[550px] sm:min-h-[650px] dark:bg-gray-950 dark:text-white duration-200">
      {/* Background Shape */}
      <div className="w-[700px] h-[700px] absolute bg-primary/40 -top-1/2 left-1/2 -translate-x-1/2 rounded-3xl rotate-45 z-0"></div>

      {/* Hero Container */}
      <div className="container pb-8 sm:pb-0 relative z-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          grabCursor={true}
          allowTouchMove={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
        >
          {Photos.map((data) => (
            <SwiperSlide key={data.id}>
              <div className="grid sm:grid-cols-2 gap-8 items-center">
                {/* Text Content Section */}
                <div className="flex flex-col gap-4">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duation="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <button
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 text-white rounded-full w-max px-6 transition-all duration-200"
                  >
                    Order now
                  </button>
                </div>

                {/* Image Section */}
                <div
                  data-aos="zoom-in"
                  data-aos-once="true"
                  className="flex justify-center items-center"
                >
                  <img
                    src={data.img}
                    alt="woman"
                    className="w-[500px] h-auto object-contain max-w-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
