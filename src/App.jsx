import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Product from "./components/products/Products";
import TopRatedProducts from "./components/TopProducts/Products";
import Banner from "./components/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/popup/Popup";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem("theme") === "dark",
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProductView, setSelectedProductView] = useState("trending");
  const [selectedSearchProduct, setSelectedSearchProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const handleChangeCartQuantity = (productId, change) => {
    setCartItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.id !== productId) return [item];
        const quantity = item.quantity + change;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      }),
    );
  };

  const handleClearCart = () => setCartItems([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProductView("all");
    setSelectedSearchProduct(null);
    scrollToProducts();
  };

  const scrollToProducts = () => {
    window.requestAnimationFrame(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleProductViewSelect = (view) => {
    setSelectedCategory("all");
    setSelectedProductView(view);
    setSelectedSearchProduct(null);
    scrollToProducts();
  };

  const handleProductSelect = (product) => {
    setSelectedCategory("all");
    setSelectedProductView("all");
    setSelectedSearchProduct(product);
    scrollToProducts();
  };

  const handleAppButtonClick = (event) => {
    const clickedButton = event.target.closest?.("button");
    if (
      clickedButton &&
      !clickedButton.closest("[data-order-popup]") &&
      !clickedButton.closest("[data-no-order-popup]")
    ) {
      setIsOrderPopupOpen(true);
    }
  };

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <div
      onClickCapture={handleAppButtonClick}
      className={`${isDark ? "dark " : ""}min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white`}
    >
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onSelectCategory={handleCategorySelect}
        onSelectProductView={handleProductViewSelect}
        onSelectProduct={handleProductSelect}
        cartItems={cartItems}
        onChangeCartQuantity={handleChangeCartQuantity}
        onClearCart={handleClearCart}
      />
      <Hero />
      <Product
        category={selectedCategory}
        view={selectedProductView}
        selectedProduct={selectedSearchProduct}
        onAddToCart={handleAddToCart}
      />
      <TopRatedProducts onAddToCart={handleAddToCart} />
      <Banner />
      <Subscribe />
      <Testimonials />
      <Footer />
      <Popup
        isOpen={isOrderPopupOpen}
        onClose={() => setIsOrderPopupOpen(false)}
      />
    </div>
  );
}

export default App;
