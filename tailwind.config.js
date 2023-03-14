/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        RacingSansOne: ["Racing Sans One", "cursive"],
        Roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        heading: ["36px", "41px"],
        small: ["18px", "21px"],
        medium: ["24px", "28px"],
        large: ["48px", "55px"],
        logo: "72px",
      },
      colors: {
        primaryHeading: "#EAEAEA",
        primaryBackground: "#5E2E53",
        secondaryBackground: "#E9E9E9",
        tertiaryBackground: "#E1A1E980",
        quaternaryBackground: "#C4C4C430",
        primaryText: "#000",
        secondaryText: "#fff",
        tertiaryText: "#EAEAEA",
        quaternaryText: "#E9E9E9",
        quinaryText: "#999999",
        primaryLogoStroke: "#431567",
        SecondaryLogoStroke: "#000",
        logoText: "#E856EB",
        logoLine: "#913693",
        primaryBorder: "#000",
      },
    },
  },
  plugins: [],
};
