import type { SourceFile } from "ts-morph";

export function findDefaultExport(sourceFile: SourceFile) {
  // Find the export default declaration
  const exportDefault = sourceFile
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());
  if (exportDefault) {
    console.log("Found 'export default':");
    const exportedExpression = exportDefault.getExpression();
    return exportedExpression;
  }
  throw new Error("No 'export default' found in the file.");
}

// Get all export default statements
// const exportDefaults = sourceFile.getExportAssignments();

// for (const exportDefault of exportDefaults) {
//   const expression = exportDefault.getExpression();
//   console.log(expression)

// // Check if the exported value is a function call
// if (TypeGuards.isCallExpression(expression)) {
//   const callExpression = expression;
//   const functionName = callExpression.getExpression().getText();
//
//   // Check if it's calling defineConfig()
//   if (functionName === "defineConfig") {
//     console.log("Found export default defineConfig:");
//     console.log(exportDefault.getText());
//   }
// }
