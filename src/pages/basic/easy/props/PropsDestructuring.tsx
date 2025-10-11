import AppBasicLayout from '../../../../modules/basic/layout/AppBasicLayout';
import Section from '../../../../modules/basic/ui/Section';

function UserBadge({ name = 'Guest', age = 18 }: { name?: string; age?: number }) {
  return <p>{name} — {age} years old</p>;
}

type BoxProps = { label?: string; count?: number };
function Box(props: BoxProps) {
  const { label = 'Items', count = 0 } = props; // destructuring inside
  return <p>{label}: {count}</p>;
}

export default function PropsDestructuring() {
  return (
    <AppBasicLayout title="Destructuring Props">
      <p>Destructure props in the parameter or inside the function.</p>
      <Section title="Parameter Destructuring">
        <UserBadge name="Linus" age={54} />
        <UserBadge />
      </Section>
      <Section title="In-Function Destructuring">
        <Box label="Files" count={3} />
        <Box />
      </Section>
    </AppBasicLayout>
  );
}