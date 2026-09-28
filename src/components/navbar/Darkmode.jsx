import light from "../../assets/light.png";
import dark from "../../assets/dark.png";

const Darkmode = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="ml-3 grid size-10 place-items-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10"
    >
      <img
        src={isDark ? light : dark}
        alt=""
        className="w-6 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-transform duration-300"
      />
    </button>
  );
};

export default Darkmode;
