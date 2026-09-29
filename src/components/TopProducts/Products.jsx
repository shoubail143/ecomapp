import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Top = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=50");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        const highRated = data.products.filter((item) => item.rating > 4);

        setProducts(highRated);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 font-bold text-white bg-gray-900 min-h-screen">
        Loading top rated products...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-bold bg-gray-900 min-h-screen">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-gray-900 text-white py-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-left mb-10">
          <p data-aos="fade-up" className="text-bold text-orange-500">
            Top Rated!
          </p>
          <h1 data-aos="fade-up" className="font-bold text-3xl md:text-4xl">
            Trending Products
          </h1>
          <p
            data-aos="fade-up"
            className="text-gray-400 font-bold text-lg mt-2"
          >
            All your needs just a click away!!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {products.map((data) => (
            <div
              key={data.id}
              className="rounded-2xl relative duration-300 hover:scale-105 group max-w-[300px] w-full bg-gray-800 p-4 shadow-lg border border-gray-700"
            >
              <div>
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="max-w-[250px] h-[250px] object-contain mx-auto block drop-shadow-md rounded-md"
                />

                <div className="flex items-center justify-center mt-4 gap-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < Math.round(data.rating)
                          ? "text-yellow-500"
                          : "text-gray-600"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">
                    ({data.rating})
                  </span>
                </div>

                {/* Product Details */}
                <h2 className="text-center font-semibold mt-2 text-md truncate text-white">
                  {data.title}
                </h2>
                <p className="text-center text-orange-500 font-bold mt-1">
                  (${`data.rating`})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top;
