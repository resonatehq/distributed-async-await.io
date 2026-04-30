import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Distributed Async Await",
  tagline: "Specification for a holistic cloud programming model.",
  favicon: "img/daa-logo.png",

  // Set the production url of your site here
  url: "https://distributed-async-await.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "resonatehq", // Usually your GitHub org/user name.
  projectName: "distributed-async-await.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root (ref: https://docusaurus.io/docs/next/docs-introduction#home-page-docs)
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/resonatehq/distributed-async-await.io/tree/main/",
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
          exclude: ["**/code/**", "motivation.mdx"],
        },
        blog: false,
        theme: {
          customCss: [
            "./static/css/custom.css",
            "./static/css/boxicons.min.css",
          ],
        },
        gtag: {
          trackingID: "G-0660YY8LZF",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  scripts: [
    {
      src: "/scripts/fullstory.js",
      async: true,
    },
    {
      src: "/scripts/cookiebanner.js",
      async: true,
    },
  ],
  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap",
      rel: "stylesheet",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      rel: "stylesheet",
    },
  ],

  themeConfig: {
    announcementBar: {
      id: 'resonate',
      content: 'Distributed Async Await is actively developed by <a href="https://resonatehq.io" target="_blank" rel="noopener noreferrer">Resonate HQ</a>',
      isCloseable: false,
    },
    image: "img/echo.png", // used for link previews
    colorMode: {
      // defaultMode: "light",
      // disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Distributed Async Await",
      logo: {
        alt: "Distributed Async Await logo",
        src: "img/daa-logo-light.png",
        srcDark: "img/daa-logo-dark.png",
        href: "/",
        target: "_self",
      },
      items: [
        {
          href: "https://echo.resonatehq.io",
          label: "Ask Echo",
          position: "right",
        },
        {
          href: "https://resonatehq.io/discord",
          html: '<i class="bx bx-md bxl-discord"></i>',
          position: "right",
        },
      ],
    },

    footer: {
      style: "light",
      links: [
        {
          html: `
            <a href="https://resonatehq.io/discord" target="_blank" rel="noopener noreferrer" aria-label="Resonate HQ Discord">
              <i class="bx bx-sm bxl-discord"></i>
            </a>
          `,
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ResonateHQ, Inc.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
