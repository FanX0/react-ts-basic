import Header from "./components/layout/Header";
import Home from "./pages/Home.tsx";
import { Link } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <nav style={{ display: "grid", gap: "0.5rem", padding: "1rem" }}>
        <Link to="/fetch-basic">Fetch Easy</Link>
        <Link to="/fetch-typed">Fetch Typed</Link>
        <Link to="/fetch-hook">Fetch Hook</Link>
        <hr />
        <Link to="/fetch-crud-basic">CRUD Basic</Link>
        <Link to="/fetch-crud-server">CRUD Server</Link>
        <Link to="/fetch-crud-hook">CRUD Hook</Link>
      </nav>
    </div>
  );
}

export default App;
