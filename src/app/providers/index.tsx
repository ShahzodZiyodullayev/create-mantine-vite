import compose from "compose-function";

import { ImageLoadProvider } from "@/shared/lib/image";
import { ErrorBoundary } from "@/app/providers/ui/error-boundary.tsx";
import { QueryProvider } from "@/app/providers/with-query.tsx";
import { GlobalErrorNotification } from "@/widgets/global-error-notification/ui/global-error-notification.tsx";

import { withMantine } from "./with-mantine";

const withOtherProviders = (Component: React.FC) => (props: any) => (
  <ErrorBoundary>
    <QueryProvider>
      <ImageLoadProvider>
        <GlobalErrorNotification />
        <Component {...props} />
      </ImageLoadProvider>
    </QueryProvider>
  </ErrorBoundary>
);

export const withProviders = compose(withMantine, withOtherProviders);
