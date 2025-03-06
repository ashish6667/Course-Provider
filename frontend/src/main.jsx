import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51QxiWTJMLkXroeApxrK7bLuP7YqyOOlCUzoQ0jl4hfqhC7NUTp8MAjNbGHcxCb7OsyHMehSWDzSQGCx3TN2x2wKx002ndGp22e");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <Elements  stripe={stripePromise}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
          </Elements>
  </StrictMode>
);
