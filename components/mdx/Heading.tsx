import { type ReactNode } from "react";

interface HeadingProps {
  id?: string;
  children?: ReactNode;
  className?: string;
}

function makeHeading(Tag: "h2" | "h3" | "h4") {
  function Heading({ id, children, className }: HeadingProps) {
    if (!id) {
      return <Tag className={className}>{children}</Tag>;
    }
    return (
      <Tag id={id} className={`group ${className ?? ""}`}>
        {children}
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 !text-accent-plum-300 hover:!text-accent-plum-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-base font-normal !no-underline"
        >
          #
        </a>
      </Tag>
    );
  }
  Heading.displayName = `Mdx${Tag.toUpperCase()}`;
  return Heading;
}

export const H2 = makeHeading("h2");
export const H3 = makeHeading("h3");
export const H4 = makeHeading("h4");
