import type { SourceFile } from "ts-morph"

export interface TsImports {
  namedImports?: string[]
  defaultImport?: string
  moduleSpecifier: string
}

export interface TsFileImports {
  imports: string | string[]
  from: string
}
// TODO LATER this might be better but need to refactor the whole implementation
// export type TsFileImports = {
//   import: string
//   from: string
// } | {
//   imports:string[]
//   from: string
// }

/**
 * Adds import declarations to a TypeScript source file while avoiding duplicates
 * @param sourceFile - The SourceFile object to modify (from ts-morph or similar AST library)
 * @param imports - Array of import declarations to add. Each import should specify:
 *                  - The module to import from
 *                  - Named imports or default import
 *                  - Optional alias information
 * @example
 * // Adds:
 * // import { Component } from 'vue';
 * // import axios as 'axios';
 * addImports(sourceFile, [
 *   { module: 'vue', namedImports: ['Component'] },
 *   { module: 'axios', defaultImport: 'axios' }
 * ]);
 */
export function addImports(sourceFile: SourceFile, imports: TsImports[]) {
  for (const importInfo of imports) {
    const { namedImports, defaultImport, moduleSpecifier } = importInfo

    // Check if an import for the module already exists
    const existingImport = sourceFile
      .getImportDeclarations()
      .find(imp => imp.getModuleSpecifierValue() === moduleSpecifier)

    if (existingImport) {
      // Merge named imports if they exist
      if (namedImports) {
        const existingNamedImports = existingImport
          .getNamedImports()
          .map(namedImport => namedImport.getName())
        const uniqueNamedImports = Array.from(
          new Set([...existingNamedImports, ...namedImports]),
        )

        // Remove all existing named imports and add the merged ones
        existingImport.removeNamedImports()
        existingImport.addNamedImports(uniqueNamedImports)
      }

      // Add default import if it doesn't already exist
      if (defaultImport && !existingImport.getDefaultImport()) {
        existingImport.setDefaultImport(defaultImport)
      }
    }
    else {
      // If no existing import, create a new one
      sourceFile.addImportDeclaration({
        namedImports,
        defaultImport,
        moduleSpecifier,
      })
    }
  }
}
