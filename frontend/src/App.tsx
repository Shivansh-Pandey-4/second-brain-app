import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProtectedPage from "./components/ProtectedPage";
import UnProtectedPage from "./components/UnProtectedPage";
import AppHome from "./components/AppHome";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/Signup"));
const PublicContent = lazy(() => import("./components/PublicContent"));

const appRouter = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AppHome />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedPage>
        <Suspense fallback={<div>Loading ...</div>}>
          <Dashboard />
        </Suspense>
      </ProtectedPage>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnProtectedPage>
        <Suspense fallback={<div>Loading ...</div>}>
          <Signup />
        </Suspense>
      </UnProtectedPage>
    ),
  },
  {
    path: "/signin",
    element: (
      <UnProtectedPage>
        <Suspense fallback={<div>Loading ...</div>}>
          <Signin />
        </Suspense>
      </UnProtectedPage>
    ),
  },
  {
    path: "/brain/:hashString",
    element: (
      <Suspense fallback={<div>Loading ...</div>}>
        <PublicContent />,
      </Suspense>
    ),
  },
]);

export default appRouter;
