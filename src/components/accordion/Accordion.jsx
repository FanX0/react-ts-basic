import { Children, cloneElement, useId, useState } from "react";

const Accordion = ({ defaultValue = null, children }) => {
  const [active, setActive] = useState(defaultValue);

  return (
    <ul>
      {Children.map(children, (child) => {
        if (!child) return child;
        const id = child.props.value; // consumer sets `value`
        const on = active === id;
        const uid = useId();
        return cloneElement(child, {
          // inject control props into each AccordionItem
          open: on,
          onOpen: () => setActive(id),
          btnId: `${uid}-btn`,
          panelId: `${uid}-panel`,
        });
      })}
    </ul>
  );
};

export default Accordion;
