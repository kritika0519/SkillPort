import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // Explicitly adding .js
import reportWebVitals from "./reportWebVitals.js"; // Explicitly adding .js
import "./index.css"; // CSS files don’t need extensions

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
