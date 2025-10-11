import { useEffect } from 'react';
import { Link } from 'react-router';
import AppBasicLayout from '../../modules/basic/layout/AppBasicLayout';
import Section from '../../modules/basic/ui/Section';

export default function BasicIndex() {
  useEffect(() => {
    document.title = 'React Basics Documentation';
  }, []);

  return (
    <AppBasicLayout title="React Basics">
      <p>Learn core React concepts with examples from easy to pro.</p>

      <Section title="Easy">
        <ul>
          <li><Link to="/basic/component">Component Basics</Link></li>
          <li><Link to="/basic/state">State Basics</Link></li>
          <li><Link to="/basic/props">Props Basics</Link></li>
          <li><Link to="/basic/effects">Effects Basics</Link></li>
          <li><Link to="/basic/conditional">Conditional Rendering Basics</Link></li>
          <li><Link to="/basic/list-keys">List & Keys Basics</Link></li>
          <li><Link to="/basic/forms">Form Basics</Link></li>
        </ul>
      </Section>

      <Section title="Intermediate">
        <ul>
          <li><Link to="/basic/context">Context Intermediate</Link></li>
          <li><Link to="/basic/reducer">Reducer Intermediate</Link></li>
          <li><Link to="/basic/memoization">Memoization Intermediate</Link></li>
          <li><Link to="/basic/custom-hooks">Custom Hooks Intermediate</Link></li>
        </ul>
      </Section>

      <Section title="Pro">
        <ul>
          <li><Link to="/basic/performance">Performance Pro</Link></li>
          <li><Link to="/basic/patterns">Patterns Pro</Link></li>
        </ul>
      </Section>
    </AppBasicLayout>
  );
}