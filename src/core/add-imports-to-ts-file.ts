import type { TsFileImports } from "../utils/add-imports.ts"
import { openAsSourceFile } from "./create-project.ts"
import { addImportsToSourceFile } from "./source-file/add-imports-to-source-file.ts"

export function addImportsToTsFile(tsFile: string, imports: TsFileImports[]) {
  const sourceFile = openAsSourceFile(tsFile)

  addImportsToSourceFile(sourceFile, imports)
  return sourceFile
}
