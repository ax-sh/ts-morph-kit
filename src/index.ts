export { addImportsToTsFile } from "./core/add-imports-to-ts-file.ts"

export { createProject, openAsSourceFile } from "./core/create-project.ts"

export { findDefaultExport } from "./utils/find-default-export.ts"

export { getFunctionNameFromExpression } from "./utils/get-function-name-from-expression.ts"

export { createTestSourceFile } from "./utils/test-utils.ts"

export {
  addBasePropertyInDefaultViteConfig,
  getDefaultViteConfig,
} from "./vite/vite.ts"
export type {
  ObjectLiteralExpression,
  ArrayLiteralExpression,
  CallExpression,
  Expression,
} from "ts-morph"
