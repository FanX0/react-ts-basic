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
import AxiosEasy from "./pages/axios/justaxios/AxiosEasy.tsx";
import AxiosTyped from "./pages/axios/justaxios/AxiosTyped.tsx";
import AxiosHook from "./pages/axios/justaxios/AxiosHook.tsx";
import CrudServerAxios from "./pages/axios/crud/CrudServerAxios.tsx";
import CrudHookAxios from "./pages/axios/crud/CrudHookAxios.tsx";
import RhfEasyFetch from "./pages/fetch/crud/RhfEasyFetch.tsx";
import RhfZodFetch from "./pages/fetch/crud/RhfZodFetch.tsx";
import RhfProFetch from "./pages/fetch/crud/RhfProFetch.tsx";
import RhfTypedFetch from "./pages/fetch/crud/RhfTypedFetch.tsx";
import RhfEasyAxios from "./pages/axios/crud/RhfEasyAxios.tsx";
import RhfZodAxios from "./pages/axios/crud/RhfZodAxios.tsx";
import RhfProAxios from "./pages/axios/crud/RhfProAxios.tsx";
import RhfTypedAxios from "./pages/axios/crud/RhfTypedAxios.tsx";

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
        <Route path="/fetch-crud-rhf-easy" element={<RhfEasyFetch />} />
        <Route path="/fetch-crud-rhf-typed" element={<RhfTypedFetch />} />
        <Route path="/fetch-crud-rhf-zod" element={<RhfZodFetch />} />
        <Route path="/fetch-crud-rhf-pro" element={<RhfProFetch />} />
        <Route path="/axios-basic" element={<AxiosEasy />} />
        <Route path="/axios-typed" element={<AxiosTyped />} />
        <Route path="/axios-hook" element={<AxiosHook />} />
        <Route path="/axios-crud-server" element={<CrudServerAxios />} />
        <Route path="/axios-crud-hook" element={<CrudHookAxios />} />
        <Route path="/axios-crud-rhf-easy" element={<RhfEasyAxios />} />
        <Route path="/axios-crud-rhf-typed" element={<RhfTypedAxios />} />
        <Route path="/axios-crud-rhf-zod" element={<RhfZodAxios />} />
        <Route path="/axios-crud-rhf-pro" element={<RhfProAxios />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
