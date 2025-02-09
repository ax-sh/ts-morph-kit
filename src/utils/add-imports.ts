import type { SourceFile } from "ts-morph";

type TsImports = {
  namedImports?: string[];
  defaultImport?: string;
  moduleSpecifier: string;
};

// Function to add imports without duplicates
export function addImports(sourceFile: SourceFile, imports: TsImports[]) {
  for (const importInfo of imports) {
    const { namedImports, defaultImport, moduleSpecifier } = importInfo;

    // Check if an import for the module already exists
    const existingImport = sourceFile
      .getImportDeclarations()
      .find((imp) => imp.getModuleSpecifierValue() === moduleSpecifier);

    if (existingImport) {
      // Merge named imports if they exist
      if (namedImports) {
        const existingNamedImports = existingImport
          .getNamedImports()
          .map((namedImport) => namedImport.getName());
        const uniqueNamedImports = Array.from(
          new Set([...existingNamedImports, ...namedImports]),
        );

        // Remove all existing named imports and add the merged ones
        existingImport.removeNamedImports();
        existingImport.addNamedImports(uniqueNamedImports);
      }

      // Add default import if it doesn't already exist
      if (defaultImport && !existingImport.getDefaultImport()) {
        existingImport.setDefaultImport(defaultImport);
      }
    } else {
      // If no existing import, create a new one
      sourceFile.addImportDeclaration({
        namedImports,
        defaultImport,
        moduleSpecifier,
      });
    }
  }
}

export function addImportsToSourceFile(
  sourceFile: SourceFile,
  imports: { imports: string | string[]; from: string }[],
) {
  const modified = imports.map<TsImports>(({ from, imports }) => {
    if (Array.isArray(imports)) {
      return { namedImports: imports, moduleSpecifier: from };
    }
    return { defaultImport: imports, moduleSpecifier: from };
  });
  return addImports(sourceFile, modified);
}
