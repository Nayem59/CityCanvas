/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      // main colour
      pink: "#C13584",
      // input field & nav icons
      "light-gray": "#BDBABA",
      //headings
      "md-gray": "#9B9B9B",
      //text colour
      black: "#000000",
      //text colour
      white: "#FFFFFF",
      //pins on map
      blue: "#0476D0",
    },
    //all fonts are the same
    fontFamily: {
      // fontSize:24px
      poppins: ["Poppins", "sans-serif"],
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      borderRadius: {
        "5xl": "2rem",
        "1xl": "2rem",
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};
