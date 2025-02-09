import { findDefaultExport } from "../utils/find-default-export.ts";
import type { SourceFile } from "ts-morph";

export function getDefaultViteConfig(sourceFile: SourceFile) {
  const exportedExpression = findDefaultExport(sourceFile);
  return new Error("Not implemented");
}
