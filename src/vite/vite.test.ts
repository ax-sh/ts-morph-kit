// import { expect, describe, it } from "bun:test";
import { getDefaultViteConfig } from "./vite.ts";
import { createTestSourceFile } from "../utils";
import { formatSourceFile } from "../utils/format-source-file.ts";
import { findDefaultExport } from "../utils/find-default-export.ts";
import { SyntaxKind } from "ts-morph";
import { expect } from "vitest";

describe("vitest config test", () => {
  const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        
        });
  ` as const;
  it.todo("should load vite config", () => {
    const config = getDefaultViteConfig();
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
});
