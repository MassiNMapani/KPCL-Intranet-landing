import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export const InfoCard = ({
  title,
  eyebrow,
  children,
  action,
  className,
}: InfoCardProps) => {
  return (
    <article className={className ? `card ${className}` : "card"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="card-heading">
        <h3>{title}</h3>
        {action}
      </div>
      <div className="card-body">{children}</div>
    </article>
  );
};
