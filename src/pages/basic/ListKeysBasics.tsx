export default function ListKeysBasics() {
  const planets = [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' },
    { id: 3, name: 'Earth' },
    { id: 4, name: 'Mars' },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h2>Lists & Keys</h2>
      <p>Render arrays with stable keys to help React reconcile efficiently.</p>
      <ul>
        {planets.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}