import axios from "axios";

const baseURL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3000";

export const http = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default http;