import { type SourceFile, ts } from "ts-morph";
import SemicolonPreference = ts.SemicolonPreference;

export function formatSourceFile(sourceFile: SourceFile) {
  sourceFile.formatText({
    indentSize: 2,
    semicolons: SemicolonPreference.Insert,
    convertTabsToSpaces: true,
  });
  return sourceFile;
}
