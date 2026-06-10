import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      // Override the on-page H1 when set; falls back to `title` (which is also
      // used for the sidebar label). Lets a page like the docs root display
      // "Home" in the sidebar but render a different headline.
      pageTitle: z.string().optional(),
      // Skip the auto-rendered H1 when the MDX body provides its own headline.
      hideTitle: z.boolean().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
