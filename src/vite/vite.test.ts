// import { expect, describe, it } from "bun:test";
import { addVitePlugins, getDefaultViteConfig } from "./vite.ts";
import { createTestSourceFile } from "../utils";
import {
  formatSourceFile,
  formatSourceFileToString,
} from "../utils/format-source-file.ts";
import { findDefaultExport } from "../utils/find-default-export.ts";

describe("vitest config test", () => {
  const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        plugins:[foo()]
        });
  ` as const;
  it("should load vite config", async () => {
    const sourceFile = await createTestSourceFile(code);
    const config = getDefaultViteConfig(sourceFile);
    expect(config).toBeDefined();
    console.log(config);
  });

  it("should ", async () => {
    const sourceFile = await createTestSourceFile(code);

    const exportedExpression = findDefaultExport(sourceFile);

    const functionName = exportedExpression.getText();
    const formatted = formatSourceFile(sourceFile).getFullText();
    console.log(formatted);
    expect(exportedExpression.getText()).toContain("defineConfig({");
    console.log("Exported Expression:");
    // console.log();
  });

  test("should modify plugins without duplicates", async () => {
    const sf = await createTestSourceFile(code);
    const modified = addVitePlugins(sf, ["dff()", "dff", "dff", ]);

    console.log(formatSourceFileToString(modified.getSourceFile()));
  });
});
