import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        lower: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5%)' }, // Ensure this is lowercase
        }
      },
      animation: {
        lower: 'lower 1s ease-in-out infinite', // Ensure this matches the keyframes name exactly
      }
    },
  },
  plugins: [],
} satisfies Config;