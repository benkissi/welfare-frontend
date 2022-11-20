/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        success: "#28a745",
        highlight: "#0085ba",
        highlightGradient: "rgba(0, 133, 186, 0.7)",
        blueBlack: "#052543",
        secondaryBlueBlack: "#374260",
        jetGray: "#CED8E6",
        jetMediumGray: "#61778B",
        jetGreen: "#00C261",
        jetBlueBlack: "#05153F",
      },
    },
  },
  plugins: [],
};
