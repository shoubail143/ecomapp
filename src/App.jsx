import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Product from "./components/products/Products";
import Products from "./components/products/Products";
import Banner from "./components/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
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

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <div
      className={`${isDark ? "dark " : ""}min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white`}
    >
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <Hero />
      <Product />
      <Products />
      <Banner />
      <Subscribe />
      <Testimonials />
    </div>
  );
}

export default App;
