import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initial: string) {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? initial);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue] as const;
}

export default function CustomHooksIntermediate() {
  const [name, setName] = useLocalStorage('name', 'Ada');
  return (
    <div style={{ padding: 16 }}>
      <h2>Custom Hooks</h2>
      <p>Extract reusable logic into hooks.</p>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p style={{ marginTop: 8 }}>Stored name: {name}</p>
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}