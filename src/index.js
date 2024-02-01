import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={document.body.classList.contains("dark") ? "dark" : "light"}
          />
        </BrowserRouter>
    </AuthProvider>
  </Provider>
);
