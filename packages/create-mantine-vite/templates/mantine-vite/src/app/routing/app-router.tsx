import { type JSX, lazy, type LazyExoticComponent } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RouteError } from "@/shared/ui/error-fallback";

type Component = LazyExoticComponent<() => JSX.Element>;

const BaseLayout = lazy(() => import("@/app/layouts/base-layout"));

const Home: Component = lazy(() => import("@/pages/home"));
const Login: Component = lazy(() => import("@/pages/login"));
const Users: Component = lazy(() => import("@/pages/users"));
const NotFound: Component = lazy(() => import("@/pages/not-found"));

export const Router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          // Pathless layout route — its errorElement renders inside BaseLayout's <Outlet />,
          // keeping header/footer visible when a child throws.
          errorElement: <RouteError />,
          children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "users", element: <Users /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
