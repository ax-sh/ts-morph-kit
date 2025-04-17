import type { ObjectLiteralExpression } from "ts-morph"
import { SyntaxKind } from "ts-morph"

export function upsertProperty(
  configObject: ObjectLiteralExpression,
  property: string,
  value: string,
) {
  // Check if the `base` property exists
  const baseProperty = configObject.getProperty(property)
  if (baseProperty?.isKind(SyntaxKind.PropertyAssignment)) {
    // Update the existing `base` property
    baseProperty.setInitializer(`"${value}"`)
  }
  else {
    // Add the `base` property if it doesn't exist
    // console.log(
    //   `${property} property not found. Adding it with the specified value.`,
    // );
    configObject.addPropertyAssignment({
      name: property,
      initializer: `"${value}"`, // Set the specified value for `base`
    })
  }
}
