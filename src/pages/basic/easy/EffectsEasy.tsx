import { useEffect, useState } from 'react';

export default function EffectsEasy() {
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Effects Basics</h2>
      <p>Side effects with <code>useEffect</code>, including cleanup.</p>

      <section>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>Reset</button>
      </section>

      <section style={{ marginTop: 16 }}>
        <p>Status: {online ? 'Online' : 'Offline'}</p>
        <button onClick={() => setOnline((o) => !o)}>Toggle Status</button>
      </section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}