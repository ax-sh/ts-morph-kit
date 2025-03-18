import type { Expression } from "ts-morph"
import { Node } from "ts-morph"

export function getFunctionNameFromExpression(exportedExpression: Expression) {
  // Check if it's a call expression
  if (Node.isCallExpression(exportedExpression)) {
    // Get the expression being called (the function name)
    const functionIdentifier = exportedExpression.getExpression()
    if (Node.isIdentifier(functionIdentifier)) {
      const functionName = functionIdentifier.getText()
      return functionName
    }
  }
  return undefined
}
