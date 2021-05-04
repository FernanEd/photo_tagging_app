module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-out": {
          "0%": { opacity: "1" },
          "25%": { opacity: "0.75" },
          "50%": { opacity: "0.5" },
          "75%": { opacity: "0.25" },
          "1000%": { opacity: "0" },
        },
      },
      animation: {
        "fade-out": "fade-out 3s ease",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
