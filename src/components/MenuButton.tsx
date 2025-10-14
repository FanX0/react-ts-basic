// MenuButton.jsx (tiny tweak to wire your actions)
import { useEffect, useRef, useState } from "react";

export default function MenuButton({ onRename, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const openMenu = (nextOpen) => {
    setOpen(nextOpen);
    requestAnimationFrame(() => {
      if (!menuRef.current || !btnRef.current) return;
      if (nextOpen) {
        menuRef.current.querySelector('[role="menuitem"]')?.focus();
      } else {
        btnRef.current.focus();
      }
    });
  };

  const getItems = () =>
    Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') ?? []);

  const onButtonKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        const items = getItems();
        (e.key === "ArrowUp" ? items.at(-1) : items[0])?.focus();
      });
    }
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      const items = getItems();
      if (!items.length) return;
      const i = items.indexOf(document.activeElement);
      if (e.key === "Escape") {
        e.preventDefault();
        openMenu(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        items[(i + 1) % items.length]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        items[(i - 1 + items.length) % items.length]?.focus();
      }
    };

    const onDocClick = (e) => {
      const m = menuRef.current,
        b = btnRef.current;
      if (m && b && !m.contains(e.target) && e.target !== b) openMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onDocClick);
    };
  }, [open]);

  return (
    <div>
      <button
        ref={btnRef}
        id="mb"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="m1"
        onClick={() => openMenu(!open)}
        onKeyDown={onButtonKeyDown}
      >
        Options
      </button>

      <ul ref={menuRef} id="m1" role="menu" hidden={!open} aria-labelledby="mb">
        <li>
          <button
            role="menuitem"
            id="m1-a"
            tabIndex={-1}
            onClick={() => {
              onRename?.();
              openMenu(false);
            }}
          >
            Rename
          </button>
        </li>
        <li>
          <button
            role="menuitem"
            id="m1-b"
            tabIndex={-1}
            onClick={() => {
              onDuplicate?.();
              openMenu(false);
            }}
          >
            Duplicate
          </button>
        </li>
        <li>
          <button
            role="menuitem"
            id="m1-c"
            tabIndex={-1}
            onClick={() => {
              onDelete?.();
              openMenu(false);
            }}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}
