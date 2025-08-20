import compose from "compose-function";

import { ImageLoadProvider } from "@/shared/lib/image";

import { withMantine } from "./with-mantine";

const withImageLoader = (Component: React.FC) => (props: any) => (
  <ImageLoadProvider>
    <Component {...props} />
  </ImageLoadProvider>
);

export const withProviders = compose(withMantine, withImageLoader);
