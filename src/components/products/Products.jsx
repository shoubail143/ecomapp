import { useState, useEffect } from "react";
// 1. Import the star icon
import { FaCheck, FaStar } from "react-icons/fa";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";

const categoryDetails = {
  all: { label: "All Products", categories: null },
  kidswear: { label: "Kids wear", categories: ["kids-wear", "kidswear"] },
  menswear: {
    label: "Mens wear",
    categories: ["mens-shirts", "mens-shoes", "mens-watches"],
  },
  electronics: {
    label: "Electronics",
    categories: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
};

const productViewDetails = {
  all: { label: "All Products" },
  trending: { label: "Trending Products" },
  "best-selling": { label: "Best Selling" },
  "top-rated": { label: "Top Rated" },
};

const Products = ({
  category = "all",
  view = "trending",
  selectedProduct = null,
  onAddToCart,
}) => {
  // 2. Set up state variables for data, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addFeedback, setAddFeedback] = useState({
    productId: null,
    animation: 0,
  });

  useEffect(() => {
    if (addFeedback.productId === null) return undefined;

    const timeoutId = window.setTimeout(() => {
      setAddFeedback((currentFeedback) => ({
        ...currentFeedback,
        productId: null,
      }));
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [addFeedback.animation, addFeedback.productId]);

  const handleAddToCart = (product) => {
    onAddToCart?.(product);
    setAddFeedback((currentFeedback) => ({
      productId: product.id,
      animation: currentFeedback.animation + 1,
    }));
  };

  // 3. Fetch data when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=194",
        );

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

  const activeCategory = categoryDetails[category] ?? categoryDetails.all;
  const categoryProducts = activeCategory.categories
    ? products.filter((product) =>
        activeCategory.categories.includes(product.category),
      )
    : products;
  const activeView = productViewDetails[view] ?? productViewDetails.trending;
  let visibleProducts = [...categoryProducts];

  if (category === "all") {
    if (view === "trending") {
      visibleProducts.sort(
        (first, second) =>
          second.discountPercentage - first.discountPercentage ||
          second.rating - first.rating,
      );
      visibleProducts = visibleProducts.slice(0, 12);
    } else if (view === "best-selling") {
      visibleProducts.sort(
        (first, second) =>
          (second.reviews?.length ?? 0) - (first.reviews?.length ?? 0) ||
          second.rating - first.rating,
      );
      visibleProducts = visibleProducts.slice(0, 12);
    } else if (view === "top-rated") {
      visibleProducts = visibleProducts
        .filter((product) => product.rating > 4)
        .sort((first, second) => second.rating - first.rating);
    }
  }

  if (selectedProduct) {
    visibleProducts = [selectedProduct];
  }

  const heading = selectedProduct
    ? "Search Result"
    : category === "all"
      ? activeView.label
      : activeCategory.label;

  return (
    <div id="products" className="container mx-auto px-4 py-10">
      {/* Headerrr*/}
      <div className="text-left mb-10">
        <p
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-once="true"
          className="text-bold text-orange-700"
        >
          {heading}
        </p>
        <h1
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
          data-aos-once="true"
          className="font-bold text-3xl"
        >
          {heading}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="200"
          data-aos-once="true"
          className="text-gray-500 font-bold text-xl mt-2"
        >
          {selectedProduct
            ? `Showing the product matching “${selectedProduct.title}”.`
            : "All your needs just a click away!!"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {visibleProducts.length === 0 ? (
          <p
            className="col-span-full py-8 text-center text-lg font-semibold text-red-600 dark:text-red-400"
            role="status"
          >
            {activeCategory.label} not found.
          </p>
        ) : (
          visibleProducts.map((data, index) => (
            <div
              key={data.id}
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={(index % 3) * 100}
              data-aos-once="true"
              className="rounded-2xl relative duration-300 hover:scale-105 group max-w-[300px] w-full bg-gray-100 dark:bg-gray-800 p-4 shadow-md"
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
                <div className="text-center">
                  <button
                    type="button"
                    data-no-order-popup
                    onClick={() => handleAddToCart(data)}
                    aria-label={`${data.title} ${addFeedback.productId === data.id ? "added to cart" : "add to cart"}`}
                    className={`add-to-cart-button inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-200 to-secondary px-3 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${addFeedback.productId === data.id ? "is-adding" : ""}`}
                  >
                    {addFeedback.productId === data.id ? (
                      <FaCheck
                        key={`added-${addFeedback.animation}`}
                        aria-hidden="true"
                        className="add-to-cart-icon"
                      />
                    ) : (
                      <PiShoppingCartSimpleDuotone
                        aria-hidden="true"
                        className="add-to-cart-icon"
                      />
                    )}
                    {addFeedback.productId === data.id
                      ? "Added!"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
