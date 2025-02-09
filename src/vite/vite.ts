import { findDefaultExport } from "../utils/find-default-export.ts";
import {
  CallExpression,
  SyntaxKind,
  type ObjectLiteralExpression,
  type SourceFile,
} from "ts-morph";

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

export function upsertProperty(
  configObject: ObjectLiteralExpression,
  property: string,
  value: string,
) {
  // Check if the `base` property exists
  const baseProperty = configObject.getProperty(property);
  if (baseProperty?.isKind(SyntaxKind.PropertyAssignment)) {
    // Update the existing `base` property
    baseProperty.setInitializer(`"${value}"`);
  } else {
    // Add the `base` property if it doesn't exist
    // console.log(
    //   `${property} property not found. Adding it with the specified value.`,
    // );
    configObject.addPropertyAssignment({
      name: property,
      initializer: `"${value}"`, // Set the specified value for `base`
    });
  }
}

export function addBaseProperty(sourceFile: SourceFile, value: string) {
  const configObject = getDefaultViteConfig(sourceFile);
  upsertProperty(configObject, "base", "doo");

  return configObject;
}

export function addVitePlugins(sourceFile: SourceFile, newPlugins: string[]) {
  const configObject = getDefaultViteConfig(sourceFile);
  // Find the `plugins` property in the object literal
  const pluginsProperty = configObject.getProperty("plugins");
  if (
    !pluginsProperty ||
    !pluginsProperty.isKind(SyntaxKind.PropertyAssignment)
  ) {
    throw new Error(
      "`plugins` property not found in the `defineConfig` object.",
    );
  }

  // Get the array literal of the `plugins` property
  const pluginsArray = pluginsProperty.getInitializer();
  if (
    !pluginsArray ||
    !pluginsArray.isKind(SyntaxKind.ArrayLiteralExpression)
  ) {
    throw new Error("`plugins` property is not initialized with an array.");
  }
  // Get the existing plugin names (to avoid duplicates)
  const existingPlugins = pluginsArray
    .getElements()
    .map((element) => element.getText().trim()); // Trim whitespace

  // Normalize and deduplicate new plugins
  const normalizedNewPlugins = Array.from(
    new Set(newPlugins.map((plugin) => plugin.trim())),
  );

  // Add new plugins that are not already present
  for (const newPlugin of normalizedNewPlugins) {
    if (!existingPlugins.some((existing) => existing === newPlugin)) {
      pluginsArray.addElement(newPlugin);
    }
  }
  return sourceFile;
}
