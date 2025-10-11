import { useMemo, useCallback, useState } from 'react';

function Expensive({ n }: { n: number }) {
  const value = useMemo(() => {
    let total = 0;
    // Simulate expensive work
    for (let i = 0; i < 200000; i++) total += Math.sqrt(n + (i % 97));
    return Math.floor(total);
  }, [n]);
  return <p>Expensive result: {value}</p>;
}

export default function MemoizationIntermediate() {
  const [n, setN] = useState(10);
  const [clicked, setClicked] = useState(0);

  const onClick = useCallback(() => setClicked((c) => c + 1), []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Memoization</h2>
      <p>Optimize recalculations with <code>useMemo</code> and stable callbacks with <code>useCallback</code>.</p>
      <label>
        N:
        <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Expensive n={n} />
      <button onClick={onClick}>Click</button>
      <p>Clicks: {clicked}</p>
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}