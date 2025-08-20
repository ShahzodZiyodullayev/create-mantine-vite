import { RouterProvider } from "react-router-dom";
import type { JSX } from "react";

import { Router } from "@/app/routing/app-router";
import { withProviders } from "@/app/providers";

const _Root = (): JSX.Element => {
  return <RouterProvider router={Router()} />;
};

export const Root = withProviders(_Root);
