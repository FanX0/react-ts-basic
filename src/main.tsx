import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/index.css";
import App from "@/App";
import Tabs from "@/components/tabs/Tabs";
import BasicIndex from "@/pages/basic/BasicIndex";
import ComponentEasy from "@/pages/basic/easy/ComponentEasy";
import StateEasy from "@/pages/basic/easy/StateEasy";
import PropsEasyIndex from "@/pages/basic/easy/props/PropsEasyIndex";
import PropsEasy from "@/pages/basic/easy/props/PropsEasy";
import PropsDestructuring from "@/pages/basic/easy/props/PropsDestructuring";
import PropsSpreadSyntax from "@/pages/basic/easy/props/PropsSpreadSyntax";
import PropsChildren from "@/pages/basic/easy/props/PropsChildren";
import PropsConditional from "@/pages/basic/easy/props/PropsConditional";
import EffectsEasy from "@/pages/basic/easy/EffectsEasy";
import ConditionalEasy from "@/pages/basic/easy/ConditionalEasy";
import ListKeysEasy from "@/pages/basic/easy/ListKeysEasy";
import FormEasy from "@/pages/basic/easy/FormEasy";
import ContextIntermediate from "@/pages/basic/intermediate/ContextIntermediate";
import ReducerIntermediate from "@/pages/basic/intermediate/ReducerIntermediate";
import MemoizationIntermediate from "@/pages/basic/intermediate/MemoizationIntermediate";
import CustomHooksIntermediate from "@/pages/basic/intermediate/CustomHooksIntermediate";
import PerformancePro from "@/pages/basic/pro/PerformancePro";
import PatternsPro from "@/pages/basic/pro/PatternsPro";
import FetchEasy from "@/pages/data/http/fetch/justfetch/FetchEasy";
import FetchTyped from "@/pages/data/http/fetch/justfetch/FetchTyped";
import FetchHook from "@/pages/data/http/fetch/justfetch/FetchHook";
import CrudBasic from "@/pages/data/http/fetch/crud/CrudBasic";
import CrudServer from "@/pages/data/http/fetch/crud/CrudServer";
import CrudHook from "@/pages/data/http/fetch/crud/CrudHook";
import AxiosEasy from "@/pages/data/http/axios/justaxios/AxiosEasy";
import AxiosTyped from "@/pages/data/http/axios/justaxios/AxiosTyped";
import AxiosHook from "@/pages/data/http/axios/justaxios/AxiosHook";
import CrudServerAxios from "@/pages/data/http/axios/crud/CrudServerAxios";
import CrudHookAxios from "@/pages/data/http/axios/crud/CrudHookAxios";
import RhfEasyFetch from "@/pages/data/http/fetch/crud/RhfEasyFetch";
import RhfZodFetch from "@/pages/data/http/fetch/crud/RhfZodFetch";
import RhfProFetch from "@/pages/data/http/fetch/crud/RhfProFetch";
import RhfTypedFetch from "@/pages/data/http/fetch/crud/RhfTypedFetch";
import RhfEasyAxios from "@/pages/data/http/axios/crud/RhfEasyAxios";
import RhfZodAxios from "@/pages/data/http/axios/crud/RhfZodAxios";
import RhfProAxios from "@/pages/data/http/axios/crud/RhfProAxios";
import RhfTypedAxios from "@/pages/data/http/axios/crud/RhfTypedAxios";
import StorageEasy from "@/pages/data/clientstorage/sessionstorage/juststorage/StorageEasy";
import StorageHook from "@/pages/data/clientstorage/sessionstorage/juststorage/StorageHook";
import StorageTyped from "@/pages/data/clientstorage/sessionstorage/juststorage/StorageTyped";
import LocalStorageEasy from "@/pages/data/clientstorage/localstorage/juststorage/StorageEasy";
import LocalStorageHook from "@/pages/data/clientstorage/localstorage/juststorage/StorageHook";
import LocalStorageTyped from "@/pages/data/clientstorage/localstorage/juststorage/StorageTyped";
import CrudEasyLocal from "@/pages/data/clientstorage/localstorage/crud/CrudEasyLocal";
import CrudHookLocal from "@/pages/data/clientstorage/localstorage/crud/CrudHookLocal";
import CrudTypedLocal from "@/pages/data/clientstorage/localstorage/crud/CrudTypedLocal";
import CrudZodLocal from "@/pages/data/clientstorage/localstorage/crud/CrudZodLocal";
import RhfEasyLocal from "@/pages/data/clientstorage/localstorage/crud/RhfEasyLocal";
import RhfZodLocal from "@/pages/data/clientstorage/localstorage/crud/RhfZodLocal";
import ThemeBasic from "@/pages/data/clientstorage/localstorage/basic/Theme/ThemeBasic";
import CartEasy from "@/pages/data/clientstorage/localstorage/basic/cart/CartEasy";
import CartPro from "@/pages/data/clientstorage/localstorage/basic/cart/CartPro";
import CartProPrice from "@/pages/data/clientstorage/localstorage/basic/cart/CartProPrice";
import CrudEasySession from "@/pages/data/clientstorage/sessionstorage/crud/CrudEasySession";
import CrudHookSession from "@/pages/data/clientstorage/sessionstorage/crud/CrudHookSession";
import CrudTypedSession from "@/pages/data/clientstorage/sessionstorage/crud/CrudTypedSession";
import RhfEasySession from "@/pages/data/clientstorage/sessionstorage/crud/RhfEasySession";
import RhfZodSession from "@/pages/data/clientstorage/sessionstorage/crud/RhfZodSession";

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
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
        <Route
          path="/basic/props/destructuring"
          element={<PropsDestructuring />}
        />
        <Route path="/basic/props/spread" element={<PropsSpreadSyntax />} />
        <Route path="/basic/props/children" element={<PropsChildren />} />
        <Route path="/basic/props/conditional" element={<PropsConditional />} />
        <Route path="/basic/effects" element={<EffectsEasy />} />
        <Route path="/basic/conditional" element={<ConditionalEasy />} />
        <Route path="/basic/list-keys" element={<ListKeysEasy />} />
        <Route path="/basic/forms" element={<FormEasy />} />
        <Route path="/basic/context" element={<ContextIntermediate />} />
        <Route path="/basic/reducer" element={<ReducerIntermediate />} />
        <Route
          path="/basic/memoization"
          element={<MemoizationIntermediate />}
        />
        <Route
          path="/basic/custom-hooks"
          element={<CustomHooksIntermediate />}
        />
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
        <Route path="/session-juststorage-easy" element={<StorageEasy />} />
        <Route path="/session-juststorage-hook" element={<StorageHook />} />
        <Route path="/session-juststorage-typed" element={<StorageTyped />} />
        <Route path="/session-crud-easy" element={<CrudEasySession />} />
        <Route path="/session-crud-hook" element={<CrudHookSession />} />
        <Route path="/session-crud-typed" element={<CrudTypedSession />} />
        <Route path="/session-crud-rhf-easy" element={<RhfEasySession />} />
        <Route path="/session-crud-rhf-zod" element={<RhfZodSession />} />
        <Route path="/local-juststorage-easy" element={<LocalStorageEasy />} />
        <Route path="/local-juststorage-hook" element={<LocalStorageHook />} />
        <Route
          path="/local-juststorage-typed"
          element={<LocalStorageTyped />}
        />
        <Route path="/local-crud-easy" element={<CrudEasyLocal />} />
        <Route path="/local-crud-hook" element={<CrudHookLocal />} />
        <Route path="/local-crud-typed" element={<CrudTypedLocal />} />
        <Route path="/local-crud-zod" element={<CrudZodLocal />} />
        <Route path="/local-crud-rhf-easy" element={<RhfEasyLocal />} />
        <Route path="/local-crud-rhf-zod" element={<RhfZodLocal />} />
        <Route path="/local-basic-theme" element={<ThemeBasic />} />
        <Route path="/local-basic-cart-easy" element={<CartEasy />} />
        <Route path="/local-basic-cart-pro" element={<CartPro />} />
        <Route path="/local-basic-cart-pro-price" element={<CartProPrice />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
