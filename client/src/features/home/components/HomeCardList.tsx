import type { ReactNode } from "react";
import { InfoCard } from "../../../components/cards/InfoCard";

type HomeCardListProps<T> = {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  items: T[];
  renderItem: (item: T) => ReactNode;
  className?: string;
};

export const HomeCardList = <T,>({
  title,
  eyebrow,
  action,
  items,
  renderItem,
  className,
}: HomeCardListProps<T>) => {
  return (
    <InfoCard title={title} eyebrow={eyebrow} action={action} className={className}>
      <ul className="list">{items.map(renderItem)}</ul>
    </InfoCard>
  );
};
