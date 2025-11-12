import {
  parseCompilerOptionsTypes,
  parseTsconfigJsonc,
  updateCompilerOptionsTypes,
} from "./tsconfig-jsonc.ts";

describe("query and mutate tsconfig", () => {
  it("should parse tsconfig", async () => {
    const data = `{
      "compilerOptions": {
        "types":["___TEST_TYPE__"]
      }
    }`;
    const updated = parseCompilerOptionsTypes(data);
    expect(updated).toEqual(["___TEST_TYPE__"]);
  });

  it("should be empty types array", async () => {
    const data = `{
      "compilerOptions": {
       // "types":[]
      }
    }`;
    const updated = parseCompilerOptionsTypes(data);

    expect(updated).toEqual([]);
  });

  it("should update compilerOptions.types with new types", () => {
    const data = `{
      "compilerOptions": {
        "types": ["existingType"]
      }
    }`;
    const updated = updateCompilerOptionsTypes(data, ["newType"]);
    const parsed = parseTsconfigJsonc(updated);

    expect(parsed.compilerOptions?.types).toEqual(["existingType", "newType"]);
  });

  it("should add types when existing array is empty", () => {
    const data = `{
      "compilerOptions": {
        "types": []
      }
    }`;
    const updated = updateCompilerOptionsTypes(data, ["newType"]);
    const parsed = parseTsconfigJsonc(updated);

    expect(parsed.compilerOptions?.types).toEqual(["newType"]);
  });

  it("should not add duplicate types to the array", () => {
    const data = `{
      "compilerOptions": {
        "types": ["typeA"]
      }
    }`;
    const updated = updateCompilerOptionsTypes(data, ["typeA", "typeB"]);
    const parsed = parseTsconfigJsonc(updated);
    expect(parsed.compilerOptions?.types).toEqual(["typeA", "typeB"]);
  });

  it("should add types when no types property exists", () => {
    const data = `{
      "compilerOptions": {}
    }`;
    const updated = updateCompilerOptionsTypes(data, ["newType"]);
    const parsed = parseTsconfigJsonc(updated);
    expect(parsed.compilerOptions?.types).toEqual(["newType"]);

    // expect(updated).toContain('"types": ["newType"]')
  });

  it.todo("should throw an error for invalid JSONC input", () => {
    const data = `{
      "compilerOptions": {`;
    expect(() => updateCompilerOptionsTypes(data, ["newType"])).toThrow();
  });
});
