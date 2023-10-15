import type { Config } from "tailwindcss";

import baseConfig from "@huddl/tailwind-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/**/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  presets: [baseConfig],
} satisfies Config;
