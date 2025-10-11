import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Tabs from "./components/tabs/Tabs.jsx";
import BasicIndex from "./pages/basic/BasicIndex.tsx";
import ComponentEasy from "./pages/basic/easy/ComponentEasy.tsx";
import StateEasy from "./pages/basic/easy/StateEasy.tsx";
import PropsEasyIndex from "./pages/basic/easy/props/PropsEasyIndex.tsx";
import PropsEasy from "./pages/basic/easy/props/PropsEasy.tsx";
import PropsDestructuring from "./pages/basic/easy/props/PropsDestructuring.tsx";
import PropsSpreadSyntax from "./pages/basic/easy/props/PropsSpreadSyntax.tsx";
import PropsChildren from "./pages/basic/easy/props/PropsChildren.tsx";
import PropsConditional from "./pages/basic/easy/props/PropsConditional.tsx";
import EffectsEasy from "./pages/basic/easy/EffectsEasy.tsx";
import ConditionalEasy from "./pages/basic/easy/ConditionalEasy.tsx";
import ListKeysEasy from "./pages/basic/easy/ListKeysEasy.tsx";
import FormEasy from "./pages/basic/easy/FormEasy.tsx";
import ContextIntermediate from "./pages/basic/intermediate/ContextIntermediate.tsx";
import ReducerIntermediate from "./pages/basic/intermediate/ReducerIntermediate.tsx";
import MemoizationIntermediate from "./pages/basic/intermediate/MemoizationIntermediate.tsx";
import CustomHooksIntermediate from "./pages/basic/intermediate/CustomHooksIntermediate.tsx";
import PerformancePro from "./pages/basic/pro/PerformancePro.tsx";
import PatternsPro from "./pages/basic/pro/PatternsPro.tsx";
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
        <Route path="/basic" element={<BasicIndex />} />
        <Route path="/basic/component" element={<ComponentEasy />} />
        <Route path="/basic/state" element={<StateEasy />} />
        <Route path="/basic/props" element={<PropsEasyIndex />} />
        <Route path="/basic/props/basic" element={<PropsEasy />} />
        <Route path="/basic/props/destructuring" element={<PropsDestructuring />} />
        <Route path="/basic/props/spread" element={<PropsSpreadSyntax />} />
        <Route path="/basic/props/children" element={<PropsChildren />} />
        <Route path="/basic/props/conditional" element={<PropsConditional />} />
        <Route path="/basic/effects" element={<EffectsEasy />} />
        <Route path="/basic/conditional" element={<ConditionalEasy />} />
        <Route path="/basic/list-keys" element={<ListKeysEasy />} />
        <Route path="/basic/forms" element={<FormEasy />} />
        <Route path="/basic/context" element={<ContextIntermediate />} />
        <Route path="/basic/reducer" element={<ReducerIntermediate />} />
        <Route path="/basic/memoization" element={<MemoizationIntermediate />} />
        <Route path="/basic/custom-hooks" element={<CustomHooksIntermediate />} />
        <Route path="/basic/performance" element={<PerformancePro />} />
        <Route path="/basic/patterns" element={<PatternsPro />} />
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
