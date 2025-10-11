type GreetingProps = {
  name: string;
  excited?: boolean;
};

function Greeting({ name, excited = false }: GreetingProps) {
  return <p>{excited ? `Hello, ${name}! 🎉` : `Hello, ${name}.`}</p>;
}

export default function PropsBasics() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Props Basics</h2>
      <p>Pass data from parent to child components via <code>props</code>.</p>

      <section>
        <h3>Examples</h3>
        <Greeting name="Ada" />
        <Greeting name="Grace" excited />
      </section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}