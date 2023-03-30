import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./app/**/*.{tsx,mdx}",
    "./mdx-components.tsx",
    "./components/**/*.tsx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1360px",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        cal: ["var(--font-cal)", ...fontFamily.sans],
      },
      colors: {
        accent: {
          500: "#F7AB0A",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
