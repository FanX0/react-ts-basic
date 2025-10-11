import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BasicIndex() {
  useEffect(() => {
    document.title = 'React Basics Documentation';
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>React Basics</h1>
      <p>Learn core React concepts with examples from easy to pro.</p>

      <h3>Easy</h3>
      <ul>
        <li><Link to="/basic/state">State Basics</Link></li>
        <li><Link to="/basic/props">Props Basics</Link></li>
        <li><Link to="/basic/effects">Effects Basics</Link></li>
        <li><Link to="/basic/conditional">Conditional Rendering Basics</Link></li>
        <li><Link to="/basic/list-keys">List & Keys Basics</Link></li>
        <li><Link to="/basic/forms">Form Basics</Link></li>
      </ul>

      <h3>Intermediate</h3>
      <ul>
        <li><Link to="/basic/context">Context Intermediate</Link></li>
        <li><Link to="/basic/reducer">Reducer Intermediate</Link></li>
        <li><Link to="/basic/memoization">Memoization Intermediate</Link></li>
        <li><Link to="/basic/custom-hooks">Custom Hooks Intermediate</Link></li>
      </ul>

      <h3>Pro</h3>
      <ul>
        <li><Link to="/basic/performance">Performance Pro</Link></li>
        <li><Link to="/basic/patterns">Patterns Pro</Link></li>
      </ul>
    </div>
  );
}