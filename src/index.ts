export { addImportsToTsFile } from "./core/add-imports-to-ts-file.ts"

export { createProject, openAsSourceFile } from "./core/create-project.ts"

export { getFunctionNameFromExpression } from "./core/get-function-name-from-expression.ts"

export { addImportsToSourceFile } from "./core/source-file/add-imports-to-source-file.ts"

export { findDefaultExport } from "./core/source-file/find-default-export.ts"

export { parseCompilerOptionsTypes } from "./core/tsconfig/tsconfig-jsonc.ts"

export {
  convertToJsonString,
  objectLiteralExpressionToJson,
} from "./utils/object-literal-expression-to-json.ts"

export { createTestSourceFile } from "./utils/test-utils.ts"

export {
  addBasePropertyInDefaultViteConfig,
  addPluginsInDefaultViteConfig,
  getDefaultViteConfig,
} from "./vite/vite.ts"

export type {
  ArrayLiteralExpression,
  CallExpression,
  Expression,
  ObjectLiteralExpression,
  SourceFile,
} from "ts-morph"

export type {
  JsonArray,
  JsonObject,
  JsonPrimitive,
  JsonValue,
} from "type-fest"
