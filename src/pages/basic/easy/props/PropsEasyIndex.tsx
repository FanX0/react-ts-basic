import { Link } from 'react-router';
import AppBasicLayout from '../../../../modules/basic/layout/AppBasicLayout';
import Section from '../../../../modules/basic/ui/Section';

export default function PropsBasicsIndex() {
  return (
    <AppBasicLayout title="Props Basics">
      <p>Explore fundamental props patterns and variants.</p>

      <Section title="Topics">
        <ul>
          <li><Link to="/basic/props/basic">Props</Link></li>
          <li><Link to="/basic/props/destructuring">Destructuring Props</Link></li>
          <li><Link to="/basic/props/spread">Spread Syntax Props</Link></li>
          <li><Link to="/basic/props/children">Nested Component (children)</Link></li>
          <li><Link to="/basic/props/conditional">Conditional Rendering</Link></li>
        </ul>
      </Section>

      <p style={{ marginTop: 16 }}>
        <Link to="/basic">Back to Basics</Link>
      </p>
    </AppBasicLayout>
  );
}