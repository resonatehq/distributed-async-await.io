import { Card, CardGrid } from "./CardGrid";

interface DocCardItem {
  type: string;
  label: string;
  href: string;
  description?: string;
}

interface DocCardListProps {
  items: DocCardItem[];
}

export default function DocCardList({ items }: DocCardListProps) {
  return (
    <CardGrid>
      {items.map((item) => (
        <Card
          key={item.href}
          title={item.label}
          description={item.description}
          href={item.href}
        />
      ))}
    </CardGrid>
  );
}
