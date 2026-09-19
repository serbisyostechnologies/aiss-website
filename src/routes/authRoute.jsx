import WebsiteLayout from "../layouts/website/WebsiteLayout";
import Login from "../pages/auth/login/Login";

const authRoutes = [
  {
    path: "/auth",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];

export default authRoutes;