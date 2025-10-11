import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Tabs from "./components/tabs/Tabs.jsx";
import FetchEasy from "./pages/fetch/justfetch/FetchEasy.tsx";
import FetchTyped from "./pages/fetch/justfetch/FetchTyped.tsx";
import FetchHook from "./pages/fetch/justfetch/FetchHook.tsx";
import CrudBasic from "./pages/fetch/crud/CrudBasic.tsx";
import CrudServer from "./pages/fetch/crud/CrudServer.tsx";
import CrudHook from "./pages/fetch/crud/CrudHook.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<Tabs />} />
        <Route path="/fetch-basic" element={<FetchEasy />} />
        <Route path="/fetch-typed" element={<FetchTyped />} />
        <Route path="/fetch-hook" element={<FetchHook />} />
        <Route path="/fetch-crud-basic" element={<CrudBasic />} />
        <Route path="/fetch-crud-server" element={<CrudServer />} />
        <Route path="/fetch-crud-hook" element={<CrudHook />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
