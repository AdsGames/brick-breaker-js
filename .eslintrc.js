module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:all",
    "plugin:@typescript-eslint/all",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "id-length": 0,
    "max-params": 0,
    "new-cap": 0,
    "class-methods-use-this": 0,
    "sort-imports": 0,
    "one-var": 0,
    "no-ternary": 0,
    "max-statements": 0,

    "no-console": "warn",

    "@typescript-eslint/no-magic-numbers": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/prefer-readonly-parameter-types": 0,
    "@typescript-eslint/prefer-regexp-exec": 0,
  },
};
