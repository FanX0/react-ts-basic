// Header.jsx
import { useId, useState } from "react";
import { NavLink } from "react-router";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const toggle = () => setOpen((o) => !o);

  return (
    <header className="relative flex h-12 items-center justify-between bg-red-500 px-6 md:gap-8">
      {/* brand + mobile toggle */}
      <div className="flex items-center gap-4">
        <img
          className="w-4 h-auto"
          src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg"
          alt="Loopstudios"
        />

        {/* mobile toggle */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggle}
          className="md:hidden inline-flex items-center justify-center rounded p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <img
            src={
              open ? "./images/icon-close.svg" : "./images/icon-hamburger.svg"
            }
            alt={open ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {/* nav */}
      <nav
        id={menuId}
        aria-hidden={!open}
        className={`absolute left-0 top-12 w-full bg-blue-500 md:static md:block md:w-auto md:bg-transparent ${
          open ? "" : "hidden"
        }`}
      >
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/product"}
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            product
          </NavLink>
          <NavLink
            to={"/category"}
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            Category
          </NavLink>
        </li>
      </nav>
    </header>
  );
};
export default Header;
