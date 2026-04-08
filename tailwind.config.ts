import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        surface: "#1A1A1A",
        white: "#FFFFFF",
        orange: "#FD5A1E",
        purple: "#6B3FA0",
        border: "#2A2A2A",
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        fredoka: ["Fredoka One", "cursive"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
