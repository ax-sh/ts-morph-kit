import { findDefaultExport } from "../utils/find-default-export.ts"
import {
  formatSourceFile,
  formatSourceFileToString,
} from "../utils/format-source-file.ts"
import { createTestSourceFile } from "../utils/test-utils.ts"
// import { expect, describe, it } from "bun:test";
import {
  addBaseProperty,
  addVitePlugins,
  getDefaultViteConfig,
} from "./vite.ts"

describe("vitest config test", () => {
  const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        plugins:[foo()]
        base:"test"
        });
  ` as const
  it("should handle empty configuration objects", async () => {
    const code = `
      import { defineConfig } from 'vite';
      export default defineConfig({});
    `
    const sourceFile = await createTestSourceFile(code)
    const modifiedSourceFile = addBaseProperty(sourceFile, "/new-base")

    const result = formatSourceFileToString(modifiedSourceFile.getSourceFile())
    expect(result).toContain(`base: "/new-base"`)
    expect(result).toMatchSnapshot() // Optional: Use snapshots for regression testing
  })
  it("should load vite config", async () => {
    const sourceFile = await createTestSourceFile(code)
    const config = getDefaultViteConfig(sourceFile)
    expect(config).toBeDefined()
    console.log(config)
  })

  it("should ", async () => {
    const sourceFile = await createTestSourceFile(code)

    const exportedExpression = findDefaultExport(sourceFile)

    const functionName = exportedExpression.getText()
    const formatted = formatSourceFile(sourceFile).getFullText()
    console.log(formatted)
    expect(exportedExpression.getText()).toContain("defineConfig({")
    console.log("Exported Expression:")
    // console.log();
  })

  it("should modify plugins without duplicates", async () => {
    const sf = await createTestSourceFile(code)
    const modified = addVitePlugins(sf, ["dff()", "dff", "dff"])

    console.log(formatSourceFileToString(modified.getSourceFile()))
  })
  it("should modify addBaseProperty without duplicates", async () => {
    const sf = await createTestSourceFile(code)
    const modified = addBaseProperty(sf, "voo")

    console.log(formatSourceFileToString(modified.getSourceFile()))
  })

  it.todo("should handle missing `defineConfig` call", async () => {
    const code = `
      export default defineConfig({});
    `
    const sourceFile = await createTestSourceFile(code)

    expect(() => addBaseProperty(sourceFile, "/new-base")).toThrowError(
      "`plugins` property not found in the `defineConfig` object.",
    )
  })
})
