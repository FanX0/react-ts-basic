import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import { Link } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <nav style={{ display: "grid", gap: "0.5rem", padding: "1rem" }}>
        <hr />
        <Link to="/basic">Basic Index</Link>
        <hr />
        <Link to="/fetch-basic">Fetch Easy</Link>
        <Link to="/fetch-typed">Fetch Typed</Link>
        <Link to="/fetch-hook">Fetch Hook</Link>
        <Link to="/fetch-crud-basic">CRUD Basic</Link>
        <Link to="/fetch-crud-server">CRUD Server</Link>
        <Link to="/fetch-crud-hook">CRUD Hook</Link>
        <Link to="/fetch-crud-rhf-easy">CRUD RHF Easy (Fetch)</Link>
        <Link to="/fetch-crud-rhf-typed">CRUD RHF Typed (Fetch)</Link>
        <Link to="/fetch-crud-rhf-zod">CRUD RHF + Zod (Fetch)</Link>
        <Link to="/fetch-crud-rhf-pro">CRUD RHF Pro (Fetch)</Link>
        <hr />
        <Link to="/axios-basic">Axios Easy</Link>
        <Link to="/axios-typed">Axios Typed</Link>
        <Link to="/axios-hook">Axios Hook</Link>
        <Link to="/axios-crud-server">Axios CRUD Server</Link>
        <Link to="/axios-crud-hook">Axios CRUD Hook</Link>
        <Link to="/axios-crud-rhf-easy">CRUD RHF Easy (Axios)</Link>
        <Link to="/axios-crud-rhf-typed">CRUD RHF Typed (Axios)</Link>
        <Link to="/axios-crud-rhf-zod">CRUD RHF + Zod (Axios)</Link>
        <Link to="/axios-crud-rhf-pro">CRUD RHF Pro (Axios)</Link>
        <hr />
        <Link to="/local-juststorage-easy">LocalStorage Easy</Link>
        <Link to="/local-juststorage-typed">LocalStorage Typed</Link>
        <Link to="/local-juststorage-hook">LocalStorage Hook</Link>
        <Link to="/local-crud-easy">LocalStorage CRUD Easy</Link>
        <Link to="/local-crud-hook">LocalStorage CRUD Hook</Link>
        <Link to="/local-crud-typed">LocalStorage CRUD Typed</Link>
        <Link to="/local-crud-zod">LocalStorage CRUD Zod</Link>
        <Link to="/local-crud-rhf-easy">LocalStorage CRUD RHF Easy</Link>
        <Link to="/local-crud-rhf-zod">LocalStorage CRUD RHF + Zod</Link>
        <Link to="/local-basic-theme">LocalStorage Theme Basic</Link>
        <Link to="/local-basic-cart-easy">LocalStorage Cart Easy</Link>
        <Link to="/local-basic-cart-pro">LocalStorage Cart Pro</Link>
        <Link to="/local-basic-score">LocalStorage Score Basic</Link>
        <Link to="/local-basic-cart-pro-price">
          LocalStorage Cart Pro Price
        </Link>
        <Link to="/local-basic-comment">LocalStorage Comment Basic</Link>
        <Link to="/local-basic-comment-replay">
          LocalStorage Comment Replay
        </Link>
        <Link to="/local-basic-comment-replay-score-pro">
          LocalStorage Comment Replay Score Pro
        </Link>
        <hr />
        <Link to="/session-juststorage-easy">SessionStorage Easy</Link>
        <Link to="/session-juststorage-typed">SessionStorage Typed</Link>
        <Link to="/session-juststorage-hook">SessionStorage Hook</Link>
        <Link to="/session-crud-easy">SessionStorage CRUD Easy</Link>
        <Link to="/session-crud-hook">SessionStorage CRUD Hook</Link>
        <Link to="/session-crud-typed">SessionStorage CRUD Typed</Link>
        <Link to="/session-crud-rhf-easy">SessionStorage CRUD RHF Easy</Link>
        <Link to="/session-crud-rhf-zod">SessionStorage CRUD RHF + Zod</Link>
      </nav>
    </div>
  );
}

export default App;
