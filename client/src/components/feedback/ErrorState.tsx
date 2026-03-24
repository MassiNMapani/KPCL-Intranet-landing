type ErrorStateProps = {
  title?: string;
  message: string;
};

export const ErrorState = ({ title = "Something went wrong", message }: ErrorStateProps) => {
  return (
    <div className="status-panel status-panel-error" role="alert">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};
