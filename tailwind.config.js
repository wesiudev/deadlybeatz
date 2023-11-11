/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        PEACH: "#FFDAB9",
        BLACK: "#000000",
        KIWI: "#8EE53F",
      },
      backgroundImage: {
        "hero-img": "url('/assets/deadly-beatz-hero.png')",
      },
      fontFamily: {
        coco: ["var(--font-cocosharp)"],
        druk: ["var(--font-druk)"],
        anton: ["var(--font-anton)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
