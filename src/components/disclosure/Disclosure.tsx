import { useId, useState } from "react";

export default function Disclosure({ summary, children }) {
  const [open, setOpen] = useState(false);
  const btnId = useId();
  const panelId = `${btnId}-panel`;

  return (
    <>
      <button
        id={btnId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        {summary}
      </button>

      <section id={panelId} hidden={!open}>
        {children}
      </section>
    </>
  );
}
