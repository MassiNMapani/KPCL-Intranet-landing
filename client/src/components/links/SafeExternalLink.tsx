import type { ReactNode } from "react";

type SafeExternalLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export const SafeExternalLink = ({
  href,
  className,
  children,
}: SafeExternalLinkProps) => {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};
