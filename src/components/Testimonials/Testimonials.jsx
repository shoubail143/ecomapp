import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const TestimonialsData = [
  {
    id: 1,
    name: "Chris",
    text: "Top of the line forever my fav!",
  },
  {
    id: 2,
    name: "Jhon",
    text: "Premium products and the good news is that they are fast in delivery too.",
  },
  {
    id: 3,
    name: "Teya",
    text: "Well & goot",
  },
  {
    id: 4,
    name: "Suliman",
    text: "Fabolus",
  },
  {
    id: 5,
    name: "Hamza",
    text: "Amazeed!",
  },
  {
    id: 6,
    name: "Patrick",
    text: "THadaaas",
  },
  {
    id: 7,
    name: "Amna",
    text: "Pretty Cool!",
  },
  {
    id: 8,
    name: "Heer",
    text: "Truly amazed.",
  },
];

const Testimonials = () => {
  return (
    <div className="py-10 pb-10">
      <div className="container">
        <div className="text-center items-center pb-10 max-w-[600px] ml-50 bg-blue-300 py-8 rounded-md px-10">
          <h4 className="font-semibold text-white dark:text-white">
            What our
            <span className="font-bold text-blue-500"> Customers </span> are
            saying!
          </h4>
        </div>
        {/* Testimonialss */}
        <div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            allowTouchMove={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {TestimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                {/* Styling container for the individual testimonial card */}
                <div className="bg-blue-300 dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-center items-center text-center">
                  {/* The testimonial text */}
                  <p className="text-gray-600 dark:text-gray-300 text-lg italic mb-4">
                    "{testimonial.text}"
                  </p>

                  {/* The customer name */}
                  <h5 className="text-blue-500 font-bold text-xl">
                    - {testimonial.name}
                  </h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
