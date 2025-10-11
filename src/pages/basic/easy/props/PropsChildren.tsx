import type { ReactNode } from 'react';
import AppBasicLayout from '../../../../modules/basic/layout/AppBasicLayout';
import Section from '../../../../modules/basic/ui/Section';
import Card from '../../../../modules/basic/ui/Card';

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card title={title}>
      {children}
    </Card>
  );
}

export default function PropsChildren() {
  return (
    <AppBasicLayout title="Nested Component (children)">
      <p>Use the <code>children</code> prop to nest UI.</p>
      <Section title="Examples">
        <Panel title="Intro">
          <p>Panels can wrap arbitrary nested content.</p>
        </Panel>
        <Panel title="List">
          <ul>
            <li>Child item A</li>
            <li>Child item B</li>
          </ul>
        </Panel>
      </Section>
    </AppBasicLayout>
  );
}