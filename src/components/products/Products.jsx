import React, { useState, useEffect } from "react";
// 1. Import the star icon
import { FaStar } from "react-icons/fa";

const Products = () => {
  // 2. Set up state variables for data, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch data when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products"); // Limit to 6 items for the grid

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // IMPORTANT: DummyJSON returns an object with a 'products' array inside
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 4. Show loading state while fetching
  if (loading)
    return (
      <div className="text-center py-10 font-bold">Loading products...</div>
    );

  // 5. Show error state if something goes wrong
  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-bold">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Headerrr*/}
      <div className="text-left mb-10">
        <p data-aos="fade-up" className="text-bold text-orange-700">
          Top Rated!
        </p>
        <h1 data-aos="fade-up" className="font-bold text-3xl">
          Trending Products
        </h1>
        <p data-aos="fade-up" className="text-gray-500 font-bold text-xl mt-2">
          All your needs just a click away!!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {products.map((data) => (
          <div
            key={data.id}
            className="rounded-2xl relative duration-300 hover:scale-105 group max-w-[300px] w-full bg-gray-100 dark:bg-red-100 p-4 shadow-md"
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
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  ({data.rating})
                </span>
              </div>

              {/* Products! */}
              <h2 className="text-center font-semibold mt-2 text-md truncate text-black">
                {data.title}
              </h2>
              <p className="text-center text-orange-700 font-bold mt-1">
                ${data.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
