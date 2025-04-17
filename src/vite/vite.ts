import type { SourceFile } from "ts-morph"
import { CallExpression, SyntaxKind } from "ts-morph"
import { getFunctionNameFromExpression } from "../core/get-function-name-from-expression.ts"
import { findDefaultExport } from "../core/source-file/find-default-export.ts"
import {
  InvalidArgumentTypeError,
  InvalidCalleeError,
  MissingArgumentsError,
  NotAFunctionCallError,
} from "../utils/errors.ts"
import { upsertProperty } from "../utils/upsert-property-to-object-expression.ts"

export function getDefaultViteConfig(sourceFile: SourceFile) {
  const exportedExpression = findDefaultExport<CallExpression>(sourceFile)
  // Ensure the exported expression is a CallExpression
  if (!CallExpression.isCallExpression(exportedExpression)) {
    throw new NotAFunctionCallError()
  }
  const functionName = getFunctionNameFromExpression(exportedExpression)
  const funcName = "defineConfig"

  // Check if the callee is `defineConfig`
  // const callee = exportedExpression.getExpression()
  if (functionName !== funcName) {
    throw new InvalidCalleeError(funcName)
  }
  // Get the arguments of the `defineConfig` call
  const args = exportedExpression.getArguments()
  if (args.length === 0) {
    throw new MissingArgumentsError(funcName)
  }

  const [configObject] = args // first argument for defineConfig({})
  if (
    !configObject
    || !configObject.isKind(SyntaxKind.ObjectLiteralExpression)
  ) {
    throw new InvalidArgumentTypeError(funcName)
  }
  return configObject
}

export function addBasePropertyInDefaultViteConfig(
  sourceFile: SourceFile,
  value: string,
) {
  const configObject = getDefaultViteConfig(sourceFile)
  upsertProperty(configObject, "base", value)

  return configObject
}

export function addPluginsInDefaultViteConfig(
  sourceFile: SourceFile,
  newPlugins: string[],
) {
  const configObject = getDefaultViteConfig(sourceFile)
  // Find the `plugins` property in the object literal
  const pluginsProperty = configObject.getProperty("plugins")
  if (
    !pluginsProperty
    || !pluginsProperty.isKind(SyntaxKind.PropertyAssignment)
  ) {
    throw new Error(
      "`plugins` property not found in the `defineConfig` object.",
    )
  }

  // Get the array literal of the `plugins` property
  const pluginsArray = pluginsProperty.getInitializer()
  if (
    !pluginsArray
    || !pluginsArray.isKind(SyntaxKind.ArrayLiteralExpression)
  ) {
    throw new Error("`plugins` property is not initialized with an array.")
  }
  // Get the existing plugin names (to avoid duplicates)
  const existingPlugins = pluginsArray
    .getElements()
    .map(element => element.getText().trim()) // Trim whitespace

  // Normalize and deduplicate new plugins
  const normalizedNewPlugins = Array.from(
    new Set(newPlugins.map(plugin => plugin.trim())),
  )

  // Add new plugins that are not already present
  for (const newPlugin of normalizedNewPlugins) {
    if (!existingPlugins.includes(newPlugin)) {
      pluginsArray.addElement(newPlugin)
    }
  }
  return sourceFile
}
