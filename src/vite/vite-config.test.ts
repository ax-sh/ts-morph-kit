import { openAsSourceFile } from "../core/create-project.ts";
import {
  formatSourceFile,
  formatSourceFileToString,
} from "../core/format-source-file.ts";
import { findDefaultExport } from "../core/find-default-export.ts";
import { getFunctionNameFromExpression } from "../core/get-function-name-from-expression.ts";
import { createTestSourceFile } from "../utils/test-utils.ts";
import { addBasePropertyInDefaultViteConfig, addPluginsInDefaultViteConfig } from "./vite.ts";

const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        plugins:[foo()],
        base:"test"
        });
  `;
vi.mock("../core/create-project.ts", async () => {
  const actual = await vi.importActual("../core/create-project.ts");
  return {
    ...actual,
    // createProject: vi.fn(),
    openAsSourceFile: vi.fn(),
  };
});

describe("vite.config.ts test", () => {
  // Before your tests, make sure to resolve the mock
  beforeEach(async () => {
    vi.mocked(openAsSourceFile).mockReturnValue(
      await createTestSourceFile(code),
    );
  });
  it("should mock the function and return a custom value", async () => {
    const result = openAsSourceFile("test.ts");
    result.formatText();

    // const mockResult = { content: "Mocked file content" };
    // expect(result).toEqual(mockResult);
    expect(openAsSourceFile).toHaveBeenCalledWith("test.ts");
    expect(openAsSourceFile).toHaveBeenCalledTimes(1);
  });
  it("[addBaseProperty] modify base without duplicates", async () => {
    const sf = openAsSourceFile("test.ts");
    const modified = addBasePropertyInDefaultViteConfig(sf, "voo");
    const formatted = formatSourceFileToString(modified.getSourceFile());
    // Assert that the base property is added correctly
    expect(formatted).toContain('base: "voo"');

    // Assert that the base property is not duplicated
    const basePropertyCount = (formatted.match(/base:/g) || []).length;
    expect(basePropertyCount).toBe(1);
  });
  it("should test formatting logic to source file", async () => {
    const sourceFile = openAsSourceFile("test.ts");
    expect(openAsSourceFile).toHaveBeenCalledWith("test.ts");
    const formatted = formatSourceFile(sourceFile).getText();
    expect(formatted).toMatchSnapshot();
  });

  it("[addVitePlugins] insert plugins without duplicates", async () => {
    const sf = openAsSourceFile("test.ts");
    const modified = addPluginsInDefaultViteConfig(sf, ["dff()", "dff", "dff"]);
    sf.formatText();
    const before = sf.getFullText().trim();
    modified.formatText();
    // const formatted = modified.getSourceFile().getFullText().trim();

    // expect(before).toContain(formatted);
    // no duplicates
    expect(before).toContain("plugins: [foo(), dff(), dff],");
  });

  it("should test function name", async () => {
    const sourceFile = openAsSourceFile("test.ts");

    const exportedExpression = findDefaultExport(sourceFile);
    const functionName = getFunctionNameFromExpression(exportedExpression);
    expect(functionName).toBe("defineConfig");
  });
  it("should throw error on missing `defineConfig` call", async () => {
    const code = `
      export default defineConfigOFF({});
    `;
    const sourceFile = await createTestSourceFile(code);

    expect(() =>
      addBasePropertyInDefaultViteConfig(sourceFile, "/new-base"),
    ).toThrowError("The 'export default' does not call 'defineConfig'.");
  });
});
