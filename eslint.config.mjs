import antfu from "@antfu/eslint-config"

export default antfu(
  {
    formatters: true,
    lib: true,
    stylistic: {
      semi: false,
      quotes: "double",
    },
  },
  {
    files: [".release-it.cjs"],
    rules: {
      "no-template-curly-in-string": "off",
      "style/quotes": "off",

    },
  },
  {
    files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}"],
    rules: {
      "style/semi": "off",
      "style/quotes": "off",
    },
  },
)
