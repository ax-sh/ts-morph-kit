import antfu from "@antfu/eslint-config"

export default antfu({
  formatters: true,
  lib: true,
  stylistic: {
    semi: false,
    quotes: "double",

  },
}, {
  files: [".release-it.cjs"],
  rules: {
    "no-template-curly-in-string": "off",
  },
})
