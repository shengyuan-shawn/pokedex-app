import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Router basename="/pokedex-app">
    <CssBaseline />
    <App />
  </Router>,
);
