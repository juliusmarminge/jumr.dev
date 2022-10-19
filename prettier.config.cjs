/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
};
