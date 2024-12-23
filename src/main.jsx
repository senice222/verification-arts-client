import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import { NotAllowed } from "./pages/NotAllowed/NotAllowed.jsx";
import { Provider } from "react-redux";
import PanelLayout from "./Layout/PanelLayout/PanelLayout.jsx";
import { store } from "./store/store";
import ActiveApplications from "./components/ActiveApplications/ActiveApplications";
import DetailedApplication from './pages/DetailedApplication/DetailedApplication'
import FinishedApplications from "./components/FinishedApplications/FinishedApplications";
import Companies from "./pages/Companies/Companies.jsx";
import AllApplications from "./pages/AllApplications/AllApplications.jsx";
import DetailedCompany from "./pages/DetailedCompany/DetailedCompany.jsx";
import Settings from "./pages/Settings/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/login/:transferString",
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
        path: "/all-applications",
        element: <AllApplications />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      // {
      //   path: "/settings",
      //   element: <Settings />,
      // },
      {
        path: "/companies/:inn",
        element: <DetailedCompany />,
      },
      {
        path: "/application/:id",
        element: <DetailedApplication />,
      },
      {
        path: "/notAllowed",
        element: <NotAllowed />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
