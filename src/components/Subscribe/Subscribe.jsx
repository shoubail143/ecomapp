import React from "react";
import bannerImg from "../../assets/bannerImg.jpg"; // Make sure this path matches your file structure

const Subscribe = () => {
  return (
    // 1. Main Section - Dark Background with the image
    <div
      data-aos="zoom-in"
      className="relative bg-gray-900 text-white py-16 overflow-hidden"
    >
      {/* Background Image Overlay (optional - remove this div if you don't want the image) */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${bannerImg})` }}
      ></div>

      {/* 2. Content Container - This sits ON TOP of the background */}
      <div className="relative container mx-auto px-4 z-10">
        {/* 3. White Box for the Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6">
            Get <span className="text-blue-500">notified</span> about new
            products
          </h1>

          {/* 4. The Form - Now inside the white box so it's visible */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full py-3 px-4 rounded-lg text-black bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
