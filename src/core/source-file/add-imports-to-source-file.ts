import type { SourceFile } from "ts-morph"
import type { TsFileImports, TsImports } from "../../utils/add-imports.ts"
import { addImports } from "../../utils/add-imports.ts"

/**
 * Adds import statements to a TypeScript source file while preventing duplicates
 * @param sourceFile - Source file object to modify (ts-morph or similar AST library)
 * @param imports - Array of import specifications to add. Each entry contains:
 *                  - `imports`: A single import specifier or array of specifiers
 *                  - `from`: The module source to import from
 * @example
 * // Adds:
 * // import React from 'react';
 * // import {,, useEffect } from 'react';
 * addImportsToSourceFile(sourceFile, [
 *   { imports: 'React', from: 'react' },
 *   { imports: ['useState', 'useEffect'], from: 'react' }
 * ]);
 *
 * @note Existing imports with the same specifiers and source will be preserved
 *       to avoid duplication. Modifies the source file in place.
 */
export function addImportsToSourceFile(
  sourceFile: SourceFile,
  imports: TsFileImports[],
) {
  const modified = imports.map<TsImports>(({ from, imports }) => {
    if (Array.isArray(imports)) {
      return { namedImports: imports, moduleSpecifier: from }
    }
    return { defaultImport: imports, moduleSpecifier: from }
  })
  return addImports(sourceFile, modified)
}
