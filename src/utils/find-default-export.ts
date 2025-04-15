import type { Expression, SourceFile } from "ts-morph";

export function findDefaultExport<T = Expression>(sourceFile: SourceFile) {
  // Find the export default declaration
  const exportDefault = sourceFile
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());
  if (!exportDefault) {
    throw new Error("No 'export default' found in the source file.");
  }
  // console.log("Found 'export default':");
  const exportedExpression = exportDefault.getExpression();
  return exportedExpression as T;
}
