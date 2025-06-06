import path from "node:path"
import { ScriptKind } from "ts-morph"
import { createProject } from "../core/create-project.ts"

export async function createMemorySourceFile(tempFile: string, input: string) {
  const project = createProject({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile(tempFile, input, {
    // Note: .js and .mjs can still be valid for TS projects.
    // We can't infer TypeScript from config.tsx.
    scriptKind:
      path.extname(tempFile) === ".ts" ? ScriptKind.TS : ScriptKind.JS,
  })

  return sourceFile
}

export async function createTestSourceFile(code: string) {
  const resolvedPath = "test.ts"
  const sourceFile = await createMemorySourceFile(resolvedPath, code)
  return sourceFile
}

export async function createMemoryTsxSourceFile(tempFile: string, code: string) {
  const project = createProject({ useInMemoryFileSystem: true, compilerOptions: {
    // jsx: JsxEmit.ReactJSX
  } })

  const sourceFile = project.createSourceFile(
    tempFile,
    code,
    {
      scriptKind: path.extname(tempFile) === ".tsx" ? ScriptKind.TSX : ScriptKind.JSX,
    },
  )
  return sourceFile
}

export async function createTestTsxSourceFile(code: string) {
  const resolvedPath = "test.tsx"
  const sourceFile = await createMemoryTsxSourceFile(resolvedPath, code)
  return sourceFile
}
