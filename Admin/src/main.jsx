import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ScrollToTop from "./pages/scrollToTop.jsx";
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";
import routes from "./routes/Routes.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
        <ToastContainer position="top-center" />
      </>
    ),
    children: routes,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
