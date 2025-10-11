import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Tabs from "./components/tabs/Tabs.jsx";
import FetchEasy from "./pages/requests/fetch/justfetch/FetchEasy.tsx";
import FetchTyped from "./pages/requests/fetch/justfetch/FetchTyped.tsx";
import FetchHook from "./pages/requests/fetch/justfetch/FetchHook.tsx";
import CrudBasic from "./pages/requests/fetch/crud/CrudBasic.tsx";
import CrudServer from "./pages/requests/fetch/crud/CrudServer.tsx";
import CrudHook from "./pages/requests/fetch/crud/CrudHook.tsx";
import AxiosEasy from "./pages/requests/axios/justaxios/AxiosEasy.tsx";
import AxiosTyped from "./pages/requests/axios/justaxios/AxiosTyped.tsx";
import AxiosHook from "./pages/requests/axios/justaxios/AxiosHook.tsx";
import CrudServerAxios from "./pages/requests/axios/crud/CrudServerAxios.tsx";
import CrudHookAxios from "./pages/requests/axios/crud/CrudHookAxios.tsx";
import RhfEasyFetch from "./pages/requests/fetch/crud/RhfEasyFetch.tsx";
import RhfZodFetch from "./pages/requests/fetch/crud/RhfZodFetch.tsx";
import RhfProFetch from "./pages/requests/fetch/crud/RhfProFetch.tsx";
import RhfTypedFetch from "./pages/requests/fetch/crud/RhfTypedFetch.tsx";
import RhfEasyAxios from "./pages/requests/axios/crud/RhfEasyAxios.tsx";
import RhfZodAxios from "./pages/requests/axios/crud/RhfZodAxios.tsx";
import RhfProAxios from "./pages/requests/axios/crud/RhfProAxios.tsx";
import RhfTypedAxios from "./pages/requests/axios/crud/RhfTypedAxios.tsx";

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
