import type { TsFileImports } from "../utils/add-imports.ts"
import { addImportsToSourceFile } from "../utils/add-imports.ts"
import { openAsSourceFile } from "./create-project.ts"

export function addImportsToTsFile(tsFile: string, imports: TsFileImports[]) {
  const sourceFile = openAsSourceFile(tsFile)

  addImportsToSourceFile(sourceFile, imports)
  return sourceFile
}
