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
        comic: {
          red: '#D00000',
          yellow: '#FFD700',
          blue: '#00BFFF',
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        comic: ['var(--font-bangers)', 'cursive'],
        body: ['var(--font-roboto)', 'sans-serif'],
      },
      backgroundImage: {
        'comic-pattern': "radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent)",
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px #000000',
        'comic-lg': '8px 8px 0px 0px #000000',
      }
    },
  },
  plugins: [],
};
export default config;
