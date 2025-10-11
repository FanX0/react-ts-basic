import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

function ThemePanel() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;
  const style = {
    padding: 8,
    marginTop: 8,
    background: ctx.theme === 'light' ? '#f7f7f7' : '#333',
    color: ctx.theme === 'light' ? '#333' : '#f7f7f7',
  };
  return (
    <div style={style}>
      Current theme: {ctx.theme}
      <button onClick={ctx.toggle} style={{ marginLeft: 8 }}>Toggle</button>
    </div>
  );
}

export default function ContextIntermediate() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Context</h2>
      <p>Share state across the tree with <code>Context</code>.</p>
      <ThemeProvider>
        <ThemePanel />
      </ThemeProvider>
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}