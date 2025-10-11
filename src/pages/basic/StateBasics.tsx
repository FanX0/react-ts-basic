import { useState } from 'react';

export default function StateBasics() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello React');

  return (
    <div style={{ padding: 16 }}>
      <h2>State Basics</h2>
      <p>Manage dynamic values with <code>useState</code>.</p>

      <section>
        <h3>Counter</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>Reset</button>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Editable Text</h3>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here" />
        <p style={{ marginTop: 8 }}>Preview: {text}</p>
      </section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}