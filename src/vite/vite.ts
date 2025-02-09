import { findDefaultExport } from "../utils/find-default-export.ts";
import { CallExpression, type SourceFile, SyntaxKind } from "ts-morph";

export class NotAFunctionCallError extends Error {
  constructor() {
    super("The 'export default' is not a function call.");
    this.name = "NotAFunctionCallError";
  }
}

export class InvalidCalleeError extends Error {
  constructor(expectedFuncName: string) {
    super(`The 'export default' does not call '${expectedFuncName}'.`);
    this.name = "InvalidCalleeError";
  }
}

export class MissingArgumentsError extends Error {
  constructor(funcName: string) {
    super(`The '${funcName}' call has no arguments.`);
    this.name = "MissingArgumentsError";
  }
}

export class InvalidArgumentTypeError extends Error {
  constructor(funcName: string) {
    super(
      `The '${funcName}' call does not contain an object literal as its argument.`,
    );
    this.name = "InvalidArgumentTypeError";
  }
}

export function getDefaultViteConfig(sourceFile: SourceFile) {
  const exportedExpression = findDefaultExport(sourceFile);
  // Ensure the exported expression is a CallExpression
  if (!CallExpression.isCallExpression(exportedExpression)) {
    throw new NotAFunctionCallError();
  }
  // Check if the callee is `defineConfig`
  const callee = exportedExpression.getExpression();
  const funcName = "defineConfig";
  if (
    callee.getKind() !== SyntaxKind.Identifier ||
    callee.getText() !== funcName
  ) {
    throw new InvalidCalleeError(funcName);
  }
  // Get the arguments of the `defineConfig` call
  const args = exportedExpression.getArguments();
  if (args.length === 0) {
    throw new MissingArgumentsError(funcName);
  }

  const [configObject] = args;
  if (
    !configObject ||
    !configObject.isKind(SyntaxKind.ObjectLiteralExpression)
  ) {
    throw new InvalidArgumentTypeError(funcName);
  }
  return configObject;
}
