import { useEffect, useState } from "react";

const ThemeToggleBasic = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") || "light"
  );

  const handleDarkMode = () => {
    setDarkMode(darkMode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "light");
    }
  }, [darkMode]);

  return (
    <button onClick={handleDarkMode}>
      <img src="/icon-moon.svg" alt="dark mode icon" />
      <p>Dark Mode</p>
    </button>
  );
};
export default ThemeToggleBasic;
