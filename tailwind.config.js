/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/components/auth/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'typewriter': 'url("/src/assets/typewriter.jpg")',
      }
    },
  },
  plugins: [],
}

