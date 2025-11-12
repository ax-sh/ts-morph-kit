import type { InMemoryFileSystemHost } from "ts-morph"
import { Project } from "ts-morph"

export function createTestProject(files: Record<string, string> = {}) {
  // Let Project create its own in-memory FS, then retrieve it
  const project = new Project({ useInMemoryFileSystem: true })
  const fs = project.getFileSystem() as InMemoryFileSystemHost

  for (const [path, content] of Object.entries(files)) {
    project.createSourceFile(path, content, { overwrite: true })
  }

  return { project, fs }
}

// Core file creation utilities
export function createTSFile(path: string, content: string) {
  return createTestProject({ [path]: content })
}

export function createTSXFile(path: string, content: string) {
  return createTSFile(path, content)
}

export function createTSFiles(files: Record<string, string>) {
  return createTestProject(files)
}

// Opinionated React component helper
export function createReactComponent(
  name: string,
  options: {
    props?: Record<string, string>
    body?: string
    isDefaultExport?: boolean
  } = {},
) {
  const {
    props = {},
    body = "return null;",
    isDefaultExport = false,
  } = options

  const propsInterface
    = Object.entries(props).length > 0
      ? `interface ${name}Props {\n  ${Object.entries(props)
        .map(([k, v]) => `${k}: ${v};`)
        .join("\n  ")}\n}`
      : `interface ${name}Props {}`

  const content = `
import React from 'react';

${propsInterface}

export ${isDefaultExport ? "default " : ""}function ${name}(props: ${name}Props) {
  ${body}
}
  `.trim()

  return createTSFile(`${name}.tsx`, content)
}

// Barrel file helper
export function createIndexFile(exports: Record<string, string>) {
  const content = Object.entries(exports)
    .map(([name, path]) => `export { ${name} } from '${path}';`)
    .join("\n")
  return createTSFile("index.ts", content)
}
