import type { TsFileImports } from "./utils/add-imports.ts"

import { openAsSourceFile } from "./core/create-project.ts"
import { addImportsToSourceFile } from "./utils/add-imports.ts"

export { createProject, openAsSourceFile } from "./core/create-project.ts"

export { findDefaultExport } from "./utils/find-default-export.ts"

export { getFunctionNameFromExpression } from "./utils/get-function-name-from-expression.ts"
export { createTestSourceFile } from "./utils/test-utils.ts"

export function addImportsToTsFile(tsFile: string, imports: TsFileImports[]) {
  const sourceFile = openAsSourceFile(tsFile)

  addImportsToSourceFile(sourceFile, imports)
  return sourceFile
}
