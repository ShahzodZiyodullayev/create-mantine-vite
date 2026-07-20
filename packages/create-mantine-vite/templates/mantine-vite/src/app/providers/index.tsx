import { type ComponentType, type ErrorInfo } from "react";

import { ImageLoadProvider } from "@/shared/lib/image";
import { ErrorBoundary } from "@/app/providers/ui/error-boundary";
import { ErrorFallback } from "@/shared/ui/error-fallback";
import { QueryProvider } from "@/app/providers/with-query";
import { GlobalErrorNotification } from "@/widgets/global-error-notification/ui/global-error-notification";

import { withMantine } from "./with-mantine";

const handleAppError = (error: unknown, info: ErrorInfo) => {
  console.error("App-level error:", error, info);
  // TODO: Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
};

const withOtherProviders = (Component: ComponentType) => () => (
  <ErrorBoundary fallback={ErrorFallback} onError={handleAppError}>
    <QueryProvider>
      <ImageLoadProvider>
        <GlobalErrorNotification />
        <Component />
      </ImageLoadProvider>
    </QueryProvider>
  </ErrorBoundary>
);

export const withProviders = (Component: ComponentType) =>
  withMantine(withOtherProviders(Component));
