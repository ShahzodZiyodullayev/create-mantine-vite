import { Component, type ReactNode } from "react";

import { ErrorFallback } from "@/shared/ui/error-fallback";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: any };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("React render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
