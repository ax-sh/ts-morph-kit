// import { expect, describe, it } from "bun:test";
import { formatSourceFileToString } from "../core/format-source-file.ts";
import { createTestSourceFile } from "../utils/test-utils.ts";
import { addBasePropertyInDefaultViteConfig, getDefaultViteConfig } from "./vite.ts";

describe("vitest config test", () => {
  const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        plugins:[foo()],
        base:"test"
        });
  ` as const;
  it("should handle empty configuration objects", async () => {
    const code = `
      import { defineConfig } from 'vite';
      export default defineConfig({});
    `;
    const sourceFile = await createTestSourceFile(code);
    const modifiedSourceFile = addBasePropertyInDefaultViteConfig(sourceFile, "/new-base");

    const result = formatSourceFileToString(modifiedSourceFile.getSourceFile());
    expect(result).toContain(`base: "/new-base"`);
    expect(result).toMatchSnapshot(); // Optional: Use snapshots for regression testing
  });
  it("should load vite config", async () => {
    const sourceFile = await createTestSourceFile(code);
    const config = getDefaultViteConfig(sourceFile);
    expect(config).toBeDefined();
  });
});
