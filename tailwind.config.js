/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://img.freepik.com/free-vector/realistic-style-technology-particle-background_23-2148426704.jpg?size=626&ext=jpg')",
        "google-btn": "url('assets/google_button.png')",
      },
      colors: {
        black: "#0e0e0e",
        white: "#f5f5f5",
      },
      fontFamily: {
        display: ["Oswald"],
      },
    },
  },
  plugins: [],
};
