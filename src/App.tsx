import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Routes from "./routes/routes";

// Assessing the React-Query Provider
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes />
      </div>{" "}
    </QueryClientProvider>
  );
}

export default App;
