/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    colors: {
      transparent: 'transparent',
      white: "#fff",
      primary: "rgb(0, 132, 255)",
      success: "#51af98",
      secondary: "#f5f7fb",
      dark: {
        DEFAULT: "#000000",
      },
      gray: {
        DEFAULT: "#E4E6EB",
      },
      text: "#4c4d4d",
      placeholder: "#9b9b9b",
      error: "#FF9494",
    },
  },
  plugins: [],
};
