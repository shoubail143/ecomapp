import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Product from "./components/products/Products";

function App() {
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
    </div>
  );
}

export default App;
