import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0f19",
        panel: "#111827",
        accent: "#f97316",
        muted: "#94a3b8"
      }
    }
  },
  plugins: []
};

export default config;
