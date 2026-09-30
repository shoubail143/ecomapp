import { useState, useEffect } from "react";
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
      <div className="bg-white py-10 text-center font-bold text-gray-900 dark:bg-gray-950 dark:text-white">
        Loading top rated products...
      </div>
    );
  if (error)
    return (
      <div className="bg-white py-10 text-center font-bold text-red-600 dark:bg-gray-950 dark:text-red-400">
        Error: {error}
      </div>
    );

  return (
    <section className="bg-white py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="text-left mb-10">
          <p data-aos="fade-up" className="font-bold text-primary">
            Top Rated!
          </p>
          <h1 data-aos="fade-up" className="font-bold text-3xl md:text-4xl">
            Trending Products
          </h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-lg font-bold text-gray-500 dark:text-gray-400"
          >
            All your needs just a click away!!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {products.map((data) => (
            <div
              key={data.id}
              className="group relative w-full max-w-[300px] rounded-2xl border border-gray-200 bg-gray-100 p-4 shadow-md duration-300 hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
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
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({data.rating})
                  </span>
                </div>

                {/* Product Details */}
                <h2 className="mt-2 truncate text-center text-md font-semibold text-gray-900 dark:text-white">
                  {data.title}
                </h2>
                <p className="mt-1 text-center font-bold text-primary">
                  (${data.rating})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Top;
