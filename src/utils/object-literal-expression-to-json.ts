import type { ObjectLiteralExpression } from "ts-morph"
import type { JsonObject, JsonValue } from "type-fest"
import { Node, SyntaxKind } from "ts-morph"

export function objectLiteralExpressionToJson(
  objectLiteral: ObjectLiteralExpression,
): JsonObject {
  const result: Record<string, JsonValue> = {}

  for (const property of objectLiteral.getProperties()) {
    if (Node.isPropertyAssignment(property)) {
      const propertyName = property.getName()
      const initializer = property.getInitializer()
      if (initializer) {
        result[propertyName] = getPropertyValue(initializer)
      }
    }
    else if (Node.isShorthandPropertyAssignment(property)) {
      const propertyName = property.getName()
      result[propertyName] = propertyName // Use name as value for shorthand
    }
  }

  return result
}

function getPropertyValue(initializer: Node): JsonValue {
  if (Node.isStringLiteral(initializer)) {
    return initializer.getLiteralValue()
  }

  if (Node.isNumericLiteral(initializer)) {
    return initializer.getLiteralValue()
  }

  if (Node.isObjectLiteralExpression(initializer)) {
    return objectLiteralExpressionToJson(initializer)
  }

  if (Node.isArrayLiteralExpression(initializer)) {
    return initializer
      .getElements()
      .map(element => getPropertyValue(element))
  }

  if (initializer.getKind() === SyntaxKind.TrueKeyword) {
    return true
  }

  if (initializer.getKind() === SyntaxKind.FalseKeyword) {
    return false
  }

  if (initializer.getKind() === SyntaxKind.NullKeyword) {
    return null
  }

  if (Node.isIdentifier(initializer)) {
    return initializer.getText()
  }

  // For other complex cases
  return initializer.getText()
}

// Usage example
export function convertToJsonString(
  objectLiteral: ObjectLiteralExpression,
): string {
  const jsObject = objectLiteralExpressionToJson(objectLiteral)
  return JSON.stringify(jsObject, null, 2)
}
