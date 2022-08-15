/** @type {import('prettier').Config} */
module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
};
