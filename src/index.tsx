import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for React 19
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Performance monitoring
reportWebVitals();
