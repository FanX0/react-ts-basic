import AppBasicLayout from '../../../../modules/basic/layout/AppBasicLayout';
import Section from '../../../../modules/basic/ui/Section';

type InfoProps = { title: string; subtitle?: string; extra?: string };
function InfoCard({ title, subtitle, extra }: InfoProps) {
  return (
    <div>
      <strong>{title}</strong>
      {subtitle && <div style={{ color: '#666' }}>{subtitle}</div>}
      {extra && <small>{extra}</small>}
    </div>
  );
}

export default function PropsSpreadSyntax() {
  const common = { title: 'React', subtitle: 'Props with spread' } satisfies Omit<InfoProps, 'extra'>;
  return (
    <AppBasicLayout title="Spread Syntax Props">
      <p>Use object spread to pass grouped props.</p>
      <Section title="Examples">
        <InfoCard {...common} />
        <InfoCard {...common} extra="v19" />
      </Section>
    </AppBasicLayout>
  );
}