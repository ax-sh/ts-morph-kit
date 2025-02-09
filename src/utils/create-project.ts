import { Project, type ProjectOptions } from "ts-morph";

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
