import { useRoutes } from "react-router-dom";
import websiteRoutes from "./webRoutes";
import NotFound from "../pages/NotFound";
import authRoutes from "./authRoute";

export default function AppRoutes() {
  const routes = useRoutes([
    ...websiteRoutes,
    ...authRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
}