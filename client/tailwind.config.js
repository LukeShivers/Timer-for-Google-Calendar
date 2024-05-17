/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#010408",
        "light-dark": "#0D1116",
        green: "#438440",
        "dark-grey": "#5f6368",
        "light-grey": "#B7B7B7",
        "lightest-grey": "#D9D9D9",
        "off-white": "#E7EDF3",
        white: "#FFFFFF",
        "g-font": "#3C4043",
        "g-lightGrey": "#EEEEEEE",
        blue: "#4285F4",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
