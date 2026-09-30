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
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  const handleAppButtonClick = (event) => {
    const clickedButton = event.target.closest?.("button");
    if (clickedButton && !clickedButton.closest("[data-order-popup]")) {
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
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <Hero />
      <Product />
      <TopRatedProducts />
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
