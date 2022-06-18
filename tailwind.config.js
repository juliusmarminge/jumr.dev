/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dark",
      {
        light: {
          primary: "#6badd3",
          secondary: "#094084",
          accent: "#562dc6",
          neutral: "#1E1320",
          "base-100": "#E6E8EA",
          info: "#A3D8EB",
          success: "#60E6AC",
          warning: "#F9DC4E",
          error: "#F91010",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
