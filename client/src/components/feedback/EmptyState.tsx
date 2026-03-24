type EmptyStateProps = {
  title?: string;
  message: string;
};

export const EmptyState = ({
  title = "No content available",
  message,
}: EmptyStateProps) => {
  return (
    <div className="status-panel" aria-live="polite">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};
