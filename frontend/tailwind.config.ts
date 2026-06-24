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
        ink: "#070707",
        panel: "#101010",
        accent: "#de1c22",
        muted: "#d2ccc0"
      }
    }
  },
  plugins: []
};

export default config;
