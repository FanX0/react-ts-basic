import { useEffect, useState } from "react";
import * as themeStore from "@/services/theme";

const ThemeBasic = () => {
  const [theme, setTheme] = useState<themeStore.Theme>("light");

  useEffect(() => {
    const t = themeStore.load();
    setTheme(t);
    document.documentElement.dataset.theme = t;
  }, []);

  const setLight = () => {
    themeStore.save("light");
    setTheme("light");
    document.documentElement.dataset.theme = "light";
  };

  const setDark = () => {
    themeStore.save("dark");
    setTheme("dark");
    document.documentElement.dataset.theme = "dark";
  };

  const toggle = () => {
    const next = themeStore.toggle();
    setTheme(next);
    document.documentElement.dataset.theme = next;
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>LocalStorage: Theme Basic</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={setLight} aria-label="Set light theme">Light</button>
        <button onClick={setDark} aria-label="Set dark theme">Dark</button>
        <button onClick={toggle} aria-label="Toggle theme">Toggle</button>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
        Theme is persisted in localStorage under key <code>"theme"</code> and applied to <code>document.documentElement.dataset.theme</code>.
      </p>
    </div>
  );
};

export default ThemeBasic;