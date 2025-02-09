import { Project, type ProjectOptions, ScriptKind } from "ts-morph";
import path from "node:path";

export function createProject(options?: ProjectOptions) {
  const project = new Project({
    compilerOptions: {},
    ...options,
  });
  return project;
}
export function openAsSourceFile(filePath: string) {
  const project = createProject();
  const sourceFile = project.addSourceFileAtPath(filePath);

  return sourceFile;
}

export async function createMemorySourceFile(tempFile: string, input: string) {
  const project = createProject({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(tempFile, input, {
    // Note: .js and .mjs can still be valid for TS projects.
    // We can't infer TypeScript from config.tsx.
    scriptKind:
      path.extname(tempFile) === ".ts" ? ScriptKind.TS : ScriptKind.JS,
  });

  return sourceFile;
}
