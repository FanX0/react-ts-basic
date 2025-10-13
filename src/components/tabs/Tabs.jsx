import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";

const Tabs = () => {
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState("Moon");
  console.log(destinations);
  useEffect(() => {
    const ac = new AbortController();
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/data.json", {
          cache: "no-store",
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        setDestinations(data?.destinations ?? []);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      }
    };
    fetchDestinations();

    return () => ac.abort();
  }, []);

  const handleSelected = (name) => {
    setSelected(name);
  };
  const active = destinations.find((d) => d.name === selected);

  return (
    <div>
      <Header />
      <div>
        {destinations.map((d) => {
          const on = d.name === active.name;
          return (
            <button
              key={d.name}
              onClick={() => handleSelected(d.name)}
              className={on ? "border-b-2 border-black" : ""}
            >
              {d.name}
            </button>
          );
        })}
      </div>
      {active && <p>{active.name}</p>}
    </div>
  );
};
export default Tabs;
