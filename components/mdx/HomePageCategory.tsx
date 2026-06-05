import { Card } from "./CardGrid";

interface HomePageCategoryProps {
  title: string;
  description?: string;
  link: string;
}

export default function HomePageCategory({ title, description, link }: HomePageCategoryProps) {
  return <Card title={title} description={description} href={link} />;
}
