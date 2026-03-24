import type { ReactNode } from "react";
import { Component } from "react";
import { ErrorState } from "../components/feedback/ErrorState";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    // Future logging hook: send sanitized error payloads to centralized logging here.
    // Future monitoring hook: increment front-end error counters and traces here.
    console.error("Unhandled application error", error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Page unavailable"
          message="The intranet failed safely. Refresh the page or contact support if the problem continues."
        />
      );
    }

    return this.props.children;
  }
}
