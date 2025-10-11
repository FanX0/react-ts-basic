import { memo, useState } from 'react';
import AppBasicLayout from '../../../modules/basic/layout/AppBasicLayout';
import Card from '../../../modules/basic/ui/Card';
import Section from '../../../modules/basic/ui/Section';
import Button from '../../../modules/basic/ui/Button';

type HelloProps = { name: string };
function HelloCard({ name }: HelloProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
      <strong>Hello, {name}!</strong>
      <p>Simple component with props.</p>
    </div>
  );
}

type User = { id: number; name: string; role: string };
function UserCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
      <strong>{user.name}</strong>
      <div style={{ color: '#666' }}>Role: {user.role}</div>
    </div>
  );
}

function PriceTag({ price }: { price: number }) {
  return (
    <div style={{ border: '1px dashed #bbb', padding: 8, borderRadius: 6 }}>
      <div>Price: ${price.toFixed(2)}</div>
      <small>Rendered at: {new Date().toLocaleTimeString()}</small>
    </div>
  );
}

const PurePriceTag = memo(PriceTag);

export default function ComponentEasy() {
  const [tick, setTick] = useState(0);
  const users: User[] = [
    { id: 1, name: 'Ada Lovelace', role: 'Engineer' },
    { id: 2, name: 'Grace Hopper', role: 'Scientist' },
    { id: 3, name: 'Linus Torvalds', role: 'Architect' },
  ];

  return (
    <AppBasicLayout title="Component Basics">
      <p>Learn about components, composing multiple components, and pure components.</p>

      <Section title="Component">
        <Card>
          <HelloCard name="World" />
        </Card>
      </Section>

      <Section title="Multiple Components">
        <div style={{ display: 'grid', gap: 8 }}>
          {users.map((u) => (
            <Card key={u.id}>
              <UserCard user={u} />
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Pure Component">
        <p>The memoized component below does not re-render when the page updates with the same props.</p>
        <div style={{ display: 'grid', gap: 8 }}>
          <Card>
            <PriceTag price={9.99} />
          </Card>
          <Card>
            <PurePriceTag price={9.99} />
          </Card>
        </div>
        <Button onClick={() => setTick((t) => t + 1)} style={{ marginTop: 8 }}>
          Re-render page: {tick}
        </Button>
      </Section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </AppBasicLayout>
  );
}