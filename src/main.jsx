import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Panel from "./pages/Panel/Panel";
import { Provider } from "react-redux";
import PanelLayout from "./Layout/PanelLayout/PanelLayout.jsx";
import { store } from "./store/store";
import ActiveApplications from "./components/ActiveApplications/ActiveApplications";
import DetailedApplication from './pages/DetailedApplication/DetailedApplication'
import FinishedApplications from "./components/FinishedApplications/FinishedApplications";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PanelLayout />,
    children: [
      {
        path: "",
        element: <ActiveApplications />,
      },
      {
        path: "/finished",
        element: <FinishedApplications />,
      },
      {
        path: "/application/:id",
        element: <DetailedApplication />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
