import { parseCompilerOptionsTypes } from "./tsconfig-jsonc.ts";

describe('query and mutate tsconfig', () => {
  it('should parse tsconfig', async () => {
    const data = `{
      "compilerOptions": {
        "types":["___TEST_TYPE__"]
      }
    }`
    const updated = parseCompilerOptionsTypes(data)
    expect(updated).toEqual(['___TEST_TYPE__'])
  })
  it('should be empty types array', async () => {
    const data = `{
      "compilerOptions": {
       // "types":[]
      }
    }`
    const updated = parseCompilerOptionsTypes(data)

    expect(updated).toEqual([])
  })
});
