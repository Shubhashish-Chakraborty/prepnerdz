/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
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
};
