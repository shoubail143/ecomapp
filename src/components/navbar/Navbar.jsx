import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa";
import Darkmode from "./Darkmode";
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#products",
    category: "all",
  },
  {
    id: 2,
    name: "Top rated",
    link: "/#top-rated",
  },
  {
    id: 3,
    name: "Kids wear",
    link: "/#products",
    category: "kidswear",
  },
  {
    id: 4,
    name: "Mens wear",
    link: "/#products",
    category: "menswear",
  },
  {
    id: 5,
    name: "Electronics",
    link: "/#products",
    category: "electronics",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending",
    view: "trending",
  },
  {
    id: 2,
    name: "Best Selling",
    view: "best-selling",
  },
  {
    id: 3,
    name: "Top Rated",
    view: "top-rated",
  },
];
const Navbar = ({
  isDark,
  onToggleTheme,
  onSelectCategory,
  onSelectProductView,
  onSelectProduct,
  cartItems = [],
  onChangeCartQuantity,
  onClearCart,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const completeOrder = () => {
    if (cartItems.length === 0) return;

    setCompletedOrder({ itemCount: cartCount, total: cartTotal });
    setIsCartOpen(false);
    onClearCart?.();
  };

  useEffect(() => {
    if (cartCount === 0) return undefined;

    setIsCartAnimating(true);
    const timeoutId = window.setTimeout(() => setIsCartAnimating(false), 400);
    return () => window.clearTimeout(timeoutId);
  }, [cartCount]);

  useEffect(() => {
    const query = searchTerm.trim();

    if (query.length < 2) {
      return undefined;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=6`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search request failed.");

        const data = await response.json();
        if (!Array.isArray(data.products)) {
          throw new Error("Search response was invalid.");
        }
        setSearchResults(data.products);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSearchError(`Couldn't search for “${query}”. Please try again.`);
        }
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  useEffect(() => {
    if (!completedOrder) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setCompletedOrder(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [completedOrder]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white shadow-md duration-300 relative z-40">
      {/*upper navbar */}
      <div className="bg-primary/40 dark:bg-gray-800">
        <div className="flex container justify-between items-center">
          <div className="w-15 h-15">
            <a fer="#" className="flex gap-2 font-bold text-2xl sm:text-3xl">
              <img src={logo} alt="" />
              NexaStore
            </a>
          </div>
          {/*search bar*/}
          <br />
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  const nextSearchTerm = event.target.value;
                  setSearchTerm(nextSearchTerm);
                  setSearchResults([]);
                  setSearchError("");
                  setIsSearching(nextSearchTerm.trim().length >= 2);
                }}
                placeholder="Search products"
                aria-label="Search products"
                aria-expanded={searchTerm.trim().length >= 2}
                aria-controls="navbar-search-results"
                autoComplete="off"
                className="w-[200px] rounded-full border border-gray-400 bg-white px-3 py-2 pr-10 text-gray-700 transition-all duration-300 group-hover:w-[300px] focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <FaSearch
                aria-hidden="true"
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 group-hover:text-primary"
              />
              {searchTerm.trim().length >= 2 && (
                <div
                  id="navbar-search-results"
                  role="listbox"
                  aria-label="Product search results"
                  className="absolute left-0 top-full z-[100] mt-2 max-h-96 w-[300px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {isSearching ? (
                    <p className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Searching products...
                    </p>
                  ) : searchError ? (
                    <p className="px-3 py-4 text-sm text-red-600 dark:text-red-400">
                      {searchError}
                    </p>
                  ) : searchResults.length ? (
                    searchResults.map((product) => (
                      <a
                        key={product.id}
                        role="option"
                        aria-selected="false"
                        href="/#products"
                        onClick={(event) => {
                          event.preventDefault();
                          onSelectProduct(product);
                          setSearchTerm("");
                          setSearchResults([]);
                        }}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/10"
                      >
                        <img
                          src={product.thumbnail}
                          alt=""
                          className="size-12 shrink-0 rounded-md bg-gray-100 object-contain dark:bg-gray-800"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">
                            {product.title}
                          </span>
                          <span className="mt-1 block text-sm font-bold text-primary">
                            ${product.price}
                          </span>
                        </span>
                      </a>
                    ))
                  ) : (
                    <p
                      className="px-3 py-4 text-sm text-red-600 dark:text-red-400"
                      role="status"
                    >
                      No products found for “{searchTerm.trim()}”.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              data-no-order-popup
              aria-expanded={isCartOpen}
              aria-controls="navbar-cart"
              onClick={() => setIsCartOpen((isOpen) => !isOpen)}
              className={`cart-button group bg-gradient-to-r from-primary to-secondary text-white py-2 px-2 sm:px-3 rounded-full flex items-center gap-2 text-sm sm:text-base shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isCartAnimating ? "is-animating" : ""}`}
            >
              <PiShoppingCartSimpleDuotone
                aria-hidden="true"
                className="cart-icon text-xl transition-transform duration-200 group-hover:rotate-[-12deg] group-hover:scale-110"
              />
              <span>
                Cart
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="cart-count ml-1 inline-block rounded-full bg-white/25 px-1.5 py-0.5 text-xs font-bold"
                    aria-label={`${cartCount} items`}
                  >
                    {cartCount}
                  </span>
                )}
              </span>
            </button>
            {isCartOpen && (
              <div
                id="navbar-cart"
                className="cart-panel absolute right-0 top-full z-[100] mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <h2 className="font-bold">Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
                    Your cart is empty.
                  </p>
                ) : (
                  <>
                    <ul className="mt-3 max-h-64 space-y-3 overflow-y-auto">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0 dark:border-gray-800"
                        >
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="size-12 shrink-0 rounded-md bg-gray-100 object-contain dark:bg-gray-800"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                              ${item.price.toFixed(2)} each
                            </span>
                          </span>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              type="button"
                              data-no-order-popup
                              aria-label={`Remove one ${item.title}`}
                              onClick={() =>
                                onChangeCartQuantity?.(item.id, -1)
                              }
                              className="grid size-7 place-items-center rounded-full border border-gray-300 font-bold transition-colors hover:border-primary hover:bg-primary/10 dark:border-gray-700"
                            >
                              -
                            </button>
                            <span
                              className="min-w-4 text-center text-sm font-semibold"
                              aria-label={`Quantity ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              data-no-order-popup
                              aria-label={`Add one ${item.title}`}
                              onClick={() => onChangeCartQuantity?.(item.id, 1)}
                              className="grid size-7 place-items-center rounded-full border border-gray-300 font-bold transition-colors hover:border-primary hover:bg-primary/10 dark:border-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-gray-200 pt-3 text-right font-bold dark:border-gray-700">
                      Total: ${cartTotal.toFixed(2)}
                    </p>
                  </>
                )}
                <button
                  type="button"
                  data-no-order-popup
                  disabled={cartItems.length === 0}
                  onClick={completeOrder}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Order Now
                </button>
              </div>
            )}
            {/* Darkmode */}
            <div>
              <Darkmode isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </div>
      {/*lower navbar*/}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                onClick={(event) => {
                  if (!data.category) return;
                  event.preventDefault();
                  onSelectCategory(data.category);
                }}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {" "}
                {data.name}
              </a>
            </li>
          ))}
          {/* Drop down */}
          <li className="cursor-pointer group relative">
            <a
              href="/#"
              className="flex items-center gap-[2px] py-2 hover:text-primary"
            >
              Trending Products
              <span className="hover:text-primary">
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="z-[9999] absolute hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      href="/#products"
                      onClick={(event) => {
                        event.preventDefault();
                        onSelectProductView(data.view);
                      }}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {completedOrder && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-950/60 px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCompletedOrder(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
            className="w-full max-w-sm rounded-xl bg-white p-6 text-center text-gray-900 shadow-2xl dark:bg-gray-900 dark:text-white"
          >
            <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-green-100 text-2xl font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
              ✓
            </div>
            <h2 id="order-success-title" className="text-xl font-bold">
              Order successful!
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Your order of {completedOrder.itemCount} item
              {completedOrder.itemCount === 1 ? "" : "s"} totaling $
              {completedOrder.total.toFixed(2)} has been placed.
            </p>
            <button
              type="button"
              data-no-order-popup
              onClick={() => setCompletedOrder(null)}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white transition hover:brightness-105"
            >
              Continue shopping
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Navbar;
