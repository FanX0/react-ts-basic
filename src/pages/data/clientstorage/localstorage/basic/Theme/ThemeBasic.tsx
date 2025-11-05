import { useEffect, useState } from "react";
import * as themeStore from "@/services/theme";

const ThemeBasic = () => {
  const [theme, setTheme] = useState<themeStore.Theme>("light");

  const applyTheme = (t: themeStore.Theme) => {
    document.documentElement.dataset.theme = t;
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  useEffect(() => {
    const t = themeStore.load();
    setTheme(t);
    applyTheme(t);
  }, []);

  const setLight = () => {
    themeStore.save("light");
    setTheme("light");
    applyTheme("light");
  };

  const setDark = () => {
    themeStore.save("dark");
    setTheme("dark");
    applyTheme("dark");
  };

  const toggle = () => {
    const next = themeStore.toggle();
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 className="bg-white text-black dark:bg-black dark:text-white">
        LocalStorage: Theme Basic
      </h2>
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={setLight} aria-label="Set light theme">
          Light
        </button>
        <button onClick={setDark} aria-label="Set dark theme">
          Dark
        </button>
        <button onClick={toggle} aria-label="Toggle theme">
          Toggle
        </button>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
        Theme is persisted in localStorage under key <code>"theme"</code> and
        applied to <code>document.documentElement.dataset.theme</code>.
      </p>
    </div>
  );
};

export default ThemeBasic;
