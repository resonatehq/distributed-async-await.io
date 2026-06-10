import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "next/link";
import { findNeighbour, type PageTree } from "fumadocs-core/server";
import Sidebar from "@/components/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import { CodeTabs, TabItem } from "@/components/mdx/CodeTabs";
import Callout from "@/components/mdx/Callout";
import { Card, CardGrid } from "@/components/mdx/CardGrid";
import { RepoCard, RepoGrid } from "@/components/mdx/RepoCard";
import HomePageCategory from "@/components/mdx/HomePageCategory";
import CloneRepoCard from "@/components/mdx/CloneRepoCard";
import DocCardList from "@/components/mdx/DocCardList";
import { Pre } from "@/components/mdx/CodeBlock";
import { H2, H3, H4 } from "@/components/mdx/Heading";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type { Metadata } from "next";

// fumadocs-mdx transforms `![alt](/path)` into either a string src (remote) or a
// StaticImageData object (local static asset). next/image accepts both — a plain
// <img /> would stringify the object to "[object Object]".
type MdxImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "placeholder"> & {
  src?: string | StaticImageData;
  placeholder?: "blur" | "empty";
};
const MdxImg = ({ src, alt = "", className, ...rest }: MdxImgProps) => {
  if (!src) return null;
  if (typeof src === "object") {
    return <Image src={src} alt={alt} className={className} placeholder={rest.placeholder} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} {...rest} />;
};

const mdxComponents = {
  Tabs: CodeTabs,
  TabItem,
  Callout,
  Card,
  CardGrid,
  RepoCard,
  RepoGrid,
  HomePageGrid: CardGrid,
  HomePageCategory,
  CloneRepoGrid: RepoGrid,
  CloneRepoCard,
  DocCardList,
  pre: Pre,
  img: MdxImg,
  h2: H2,
  h3: H3,
  h4: H4,
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

type Crumb = { url?: string; name: string };

// Title-case a raw URL slug as a fallback when the page tree doesn't resolve
// a matching folder (e.g. deeply nested route where the section has no index).
function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part.length === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}

// Walks the fumadocs page tree to the target URL, collecting the display name
// of each folder crossed. The final page's title is appended by the caller so
// breadcrumbs render the exact `page.data.title` for the leaf.
function breadcrumbTrail(
  nodes: PageTree.Node[],
  targetUrl: string,
  trail: Crumb[] = []
): Crumb[] | null {
  for (const node of nodes) {
    if (node.type === "page" && node.url === targetUrl) {
      return trail;
    }
    if (node.type === "folder") {
      if (node.index?.url === targetUrl) return trail;
      const next = [...trail, { url: node.index?.url, name: String(node.name) }];
      const found = breadcrumbTrail(node.children, targetUrl, next);
      if (found) return found;
    }
  }
  return null;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const tree = source.pageTree;
  const neighbours = findNeighbour(tree, page.url);

  // Resolve middle-breadcrumb names from the page tree so they render as titled
  // section names ("Develop with Resonate") instead of raw slug fragments ("develop").
  // If the tree walk fails for any reason (deeply nested unindexed section),
  // fall back to title-casing the slug so we never render an unstyled lowercase segment.
  const trail = breadcrumbTrail(tree.children, page.url) ?? [];
  const crumbs: Crumb[] = (slug ?? []).map((segment, i, all) => {
    if (i === all.length - 1) return { name: page.data.title };
    return trail[i] ?? { name: titleCaseSlug(segment) };
  });

  const MDX = page.data.body;

  return (
    <div className="flex">
      <Sidebar tree={tree} currentPath={page.url} />

      <main className="flex-1 min-w-0 px-6 md:px-10 py-8">
        {/* Breadcrumbs (suppressed on the docs root) */}
        {crumbs.length > 0 && (
          <nav className="text-xs text-bright-gray-500 dark:text-muted mb-6 font-mono" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-bright-gray-900 dark:hover:text-primary transition">
              Handbook
            </Link>
            {crumbs.map((crumb, i) => (
              <span key={i}>
                <span className="mx-1.5">/</span>
                {i === crumbs.length - 1 ? (
                  <span className="text-bright-gray-900 dark:text-primary">{crumb.name}</span>
                ) : crumb.url ? (
                  <Link href={crumb.url} className="hover:text-bright-gray-900 dark:hover:text-primary transition">
                    {crumb.name}
                  </Link>
                ) : (
                  <span>{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Content */}
        <article className="docs-content max-w-3xl">
          {!page.data.hideTitle && <h1>{page.data.pageTitle ?? page.data.title}</h1>}
          {!page.data.hideTitle && page.data.description && (
            <p className="text-lg text-bright-gray-500 dark:text-muted font-serif mb-8 !mt-0">
              {page.data.description}
            </p>
          )}
          <MDX components={mdxComponents} />
        </article>

        {/* Edit on GitHub */}
        <div className="mt-10 max-w-3xl">
          <a
            href={`https://github.com/resonatehq/distributed-async-await.io/edit/main/content/${page.file.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-secondary transition"
          >
            <Pencil size={14} />
            Edit this page on GitHub
          </a>
        </div>

        {/* Prev / Next (section-aware via fumadocs findNeighbour) */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-bright-gray-200 dark:border-primary/10 max-w-3xl">
          {neighbours.previous ? (
            <Link
              href={neighbours.previous.url}
              className="group flex items-center gap-2 text-sm text-bright-gray-500 dark:text-muted hover:text-bright-gray-900 dark:hover:text-primary transition focus-visible:outline-2 focus-visible:outline-secondary"
            >
              <ChevronLeft size={14} />
              <span className="group-hover:text-secondary transition">
                {neighbours.previous.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {neighbours.next ? (
            <Link
              href={neighbours.next.url}
              className="group flex items-center gap-2 text-sm text-bright-gray-500 dark:text-muted hover:text-bright-gray-900 dark:hover:text-primary transition focus-visible:outline-2 focus-visible:outline-secondary"
            >
              <span className="group-hover:text-secondary transition">
                {neighbours.next.name}
              </span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <TableOfContents toc={page.data.toc} />
    </div>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) return {};

  const title = page.data.title;
  const description =
    page.data.description || `${title} — the Distributed Async Await SDK author's handbook`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Distributed Async Await`,
      description,
      url: `https://distributed-async-await.io${page.url}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Distributed Async Await`,
      description,
    },
    alternates: {
      canonical: `https://distributed-async-await.io${page.url}`,
    },
  };
}
