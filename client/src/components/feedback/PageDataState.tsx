import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

type PageDataStateProps = {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyTitle: string;
  emptyMessage: string;
  emptyFallback?: ReactNode;
  children: ReactNode;
};

export const PageDataState = ({
  isLoading,
  error,
  isEmpty,
  emptyTitle,
  emptyMessage,
  emptyFallback,
  children,
}: PageDataStateProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isEmpty) {
    return emptyFallback ?? <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return <>{children}</>;
};
