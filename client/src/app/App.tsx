import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoadingState } from "../components/feedback/LoadingState";
import { AppErrorBoundary } from "./error-boundary";

export const App = () => {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </AppErrorBoundary>
  );
};
