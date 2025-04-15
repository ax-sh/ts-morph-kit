import type { SourceFile } from "ts-morph"
import { ts } from "ts-morph"
// import SemicolonPreference = ts.SemicolonPreference;

export function formatSourceFile(sourceFile: SourceFile) {
  sourceFile.formatText({
    indentSize: 2,
    semicolons: ts.SemicolonPreference.Insert,
    convertTabsToSpaces: true,
  })
  return sourceFile
}

export function formatSourceFileToString(sourceFile: SourceFile) {
  return formatSourceFile(sourceFile).getFullText()
}
