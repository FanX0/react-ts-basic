import { useEffect } from 'react';

export default function BasicIndex() {
  useEffect(() => {
    document.title = 'React Basics Documentation';
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>React Basics</h1>
      <p>Learn core React concepts with small, focused examples.</p>
      <ul>
        <li><a href="/basic/state">State Basics</a></li>
        <li><a href="/basic/props">Props Basics</a></li>
      </ul>
    </div>
  );
}