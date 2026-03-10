/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-red-500", "text-center", "flex", "grid", "p-4", "m-4"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-gray": {
          100: "var(--custom-gray-100)",
          200: "var(--custom-gray-200)",
          300: "var(--custom-gray-300)",
          400: "var(--custom-gray-400)",
          500: "var(--custom-gray-500)",
          600: "var(--custom-gray-600)",
          700: "var(--custom-gray-700)",
          800: "var(--custom-gray-800)",
          900: "var(--custom-gray-900)",
        },
        "custom-red": {
          400: "var(--custom-red-400)",
          500: "var(--custom-red-500)",
        },
        "custom-green": {
          400: "var(--custom-green-400)",
          500: "var(--custom-green-500)",
          600: "var(--custom-green-600)",
          800: "var(--custom-green-800)",
        },
        "custom-yellow": {
          500: "var(--custom-yellow-500)",
        },
        "custom-purple": {
          300: "var(--custom-purple-300)",
        },
      },
    },
  },
  plugins: [],
};
