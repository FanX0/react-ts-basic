const AccordionItem = ({ label, children, open, onOpen, btnId, panelId }) => {
  return (
    <li>
      <button
        id={btnId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onOpen}
      >
        {label}
      </button>
      <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
        {children}
      </div>
    </li>
  );
};
export default AccordionItem;
