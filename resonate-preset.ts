import type { Config } from "tailwindcss";

/**
 * Shared Resonate design system preset.
 * Consumed by both resonatehq.io (marketing) and docs.resonatehq.io (docs).
 * Source of truth for fonts, colors, and shadows.
 */
const resonatePreset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "sans-serif",
        ],
        display: [
          "var(--font-sansation)",
          "Sansation",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-lora)",
          "Lora",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        mono: [
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        link: "#3f4965",
        "bright-gray": {
          "50": "#f7f6f4",
          "100": "#edece8",
          "200": "#dcdad4",
          "300": "#b5b2ab",
          "400": "#818faf",
          "500": "#617196",
          "600": "#4c597d",
          "700": "#3f4965",
          "800": "#373f56",
          "900": "#313749",
          "950": "#212430",
        },
        "dark-gray": {
          "600": "#444950",
          "700": "#242526",
          "800": "#1c1e21",
          "900": "#1b1b1d",
        },
        dark: "#080A0E",
        ink: "#0F1115",
        primary: "#E4E7EB",
        secondary: "#1EE3CF",
        muted: "#94A3B8",
        surface: {
          dark: "#080A0E",
          DEFAULT: "#080A0E",
          elevated: "#0F1115",
          subtle: "#1A1E26",
          light: "#FAFAF7",
        },
        accent: {
          teal: {
            DEFAULT: "#1EE3CF",
            50: "#ECFDF8",
            100: "#D1FAE5",
            200: "#A7F3D0",
            300: "#6EE7B7",
            400: "#34D399",
            500: "#1EE3CF",
            600: "#0FB3A1",
            700: "#0D9488",
            800: "#115E59",
            900: "#134E4A",
          },
          plum: {
            DEFAULT: "#C2185B",
            50: "#FDF2F8",
            100: "#FCE7F3",
            200: "#FBCFE8",
            300: "#F9A8D4",
            400: "#F472B6",
            500: "#C2185B",
            600: "#9B1348",
            700: "#831843",
            800: "#6B1536",
            900: "#500F2A",
          },
          ember: {
            DEFAULT: "#B45309",
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#FBBF24",
            500: "#B45309",
            600: "#92400E",
            700: "#78350F",
            800: "#5F2D0E",
            900: "#451A03",
          },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(30, 227, 207, 0.25)",
        "glow-sm": "0 0 10px rgba(30, 227, 207, 0.15)",
        "glow-lg": "0 0 30px rgba(30, 227, 207, 0.35)",
        "glow-plum": "0 0 20px rgba(194, 24, 91, 0.25)",
        "glow-ember": "0 0 20px rgba(180, 83, 9, 0.25)",
      },
    },
  },
};

export default resonatePreset;
