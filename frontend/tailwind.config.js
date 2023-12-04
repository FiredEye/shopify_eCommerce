/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        res_xm: "650px",
        res_sm: "900px",
        res_md: "1260px",
        res_hlg: "500px",
      },
    },
  },
  plugins: [],
});
