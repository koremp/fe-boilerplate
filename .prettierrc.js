/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  parser: "typescript",
  semi: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: true,
  printWidth: 80
};

export default config;