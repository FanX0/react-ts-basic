import AppBasicLayout from '@/modules/basic/layout/AppBasicLayout';
import Section from '@/modules/basic/ui/Section';

type GreetingProps = { name: string; excited?: boolean };

function Greeting({ name, excited = false }: GreetingProps) {
  return <p>{excited ? `Hello, ${name}! 🎉` : `Hello, ${name}.`}</p>;
}

export default function PropsBasic() {
  return (
    <AppBasicLayout title="Props">
      <p>Pass data from parent to child via props.</p>
      <Section title="Examples">
        <Greeting name="Ada" />
        <Greeting name="Grace" excited />
      </Section>
    </AppBasicLayout>
  );
}