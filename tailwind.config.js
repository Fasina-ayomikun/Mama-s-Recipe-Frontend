/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    screens: {
      sm: "0px",
      md: "468px",
      lg: "766px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        background: "url('/src/images/hero.jpg')",
      },
      colors: {
        green: "#70e000",
        black: "#000",
        grey: "#C3BFBF",
        "dark-green": "#38b000",
        gold: "#ff8800",
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },

  plugins: [],
};
