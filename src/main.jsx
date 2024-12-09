import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppExample from "./AppExample";
import "./index.css";

const qeuryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={qeuryClient}>
      <AppExample />
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  </StrictMode>
);
