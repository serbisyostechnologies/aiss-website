import WebsiteLayout from "../layouts/website/WebsiteLayout";

import Home from "../pages/website/home/Home";
import Pricing from "../pages/website/pricing/Pricing";
import Contact from "../pages/website/contact/Contact";
import PrivacyPolicy from "../pages/website/privacy/PrivacyPolicy";
import TermsConditions from "../pages/website/terms/TermsConditions";
import TransactionHistory from "../pages/website/transaction-history/TransactionHistory";

import CreateImage from "../pages/website/features/image/create/CreateImage";
import EditImage from "../pages/website/features/image/edit/EditImage";
import CreateCollage from "../pages/website/features/image/collage/CreateCollage";

import CreateVideo from "../pages/website/features/video/create/CreateVideo";
import EditVideo from "../pages/website/features/video/edit/EditVideo";

import Profile from "../pages/website/profile/Profile";

import ProtectedRoute from "../utils/ProtectedRoute";

const websiteRoutes = [
  {
    path: "/",
    element: <WebsiteLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "plans",
        element: <Pricing />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },

      {
        path: "terms-conditions",
        element: <TermsConditions />,
      },

      // Protected feature routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "transaction-history",
            element: <TransactionHistory />,
          },
          {
            path: "features",
            children: [
              {
                path: "image",
                children: [
                  {
                    path: "create",
                    element: <CreateImage />,
                  },
                  {
                    path: "edit",
                    element: <EditImage />,
                  },
                  {
                    path: "collage",
                    element: <CreateCollage />,
                  },
                ],
              },
              {
                path: "video",
                children: [
                  {
                    path: "create",
                    element: <CreateVideo />,
                  },
                  {
                    path: "edit",
                    element: <EditVideo />,
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default websiteRoutes;