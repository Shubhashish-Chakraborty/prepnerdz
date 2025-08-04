/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './icons/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

    "./app/**/*.{js,ts,jsx,tsx}", // if using /app router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        saira: ["var(--font-saira)"],
        special: ["var(--font-special-gothic)"],
        myfont2: ["var(--font-myfont2)"], // Share Tech
        myfont3: ["var(--font-myfont3)"], // Josefin Sans

      },
    },
  },
  plugins: [],

} 
};