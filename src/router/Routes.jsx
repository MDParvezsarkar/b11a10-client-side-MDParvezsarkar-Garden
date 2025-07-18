import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BrowseTips from "../pages/BrowseTips";
import TipDetails from "../pages/TipDetails";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import ShareTip from "../pages/ShareTip";
import MyTips from "../pages/MyTips";
import EditTip from "../components/EditTip";
import ExploreGardeners from "../pages/ExploreGardeners";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/browse-tips", element: <BrowseTips /> },
      { path: "/tip/:id", element: <TipDetails /> },
      { path: "/explore-gardeners", element: <ExploreGardeners /> },
      {
        path: "/share-tip",
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tips",
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-tip/:id",
        element: (
          <PrivateRoute>
            <EditTip />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
