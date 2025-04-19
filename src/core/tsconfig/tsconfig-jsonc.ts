import type { EditResult, JSONPath, ModificationOptions, ParseError } from "jsonc-parser"
import { modify, parse } from "jsonc-parser"

// More complete type definition with optional fields
export interface TsconfigContent {
  readonly compilerOptions?: {
    readonly types?: string[]
    [key: string]: unknown
  }
  readonly [key: string]: unknown
}

export function parseTsconfigJsonc(rawJsonString: string): TsconfigContent {
  const errors: ParseError[] = []
  try {
    const tsconfig = parse(rawJsonString, errors) as TsconfigContent
    return tsconfig
  }
  catch (e) {
    const error = e as Error
    throw new Error(
      `Failed to parse tsconfig: ${error.message} ${errors.map(e => e.error).join(", ")}`,
    )
  }
}

/**
 * Extracts compiler options types from tsconfig
 * @param rawJsonString The raw tsconfig JSON string
 * @returns Array of type names
 * @throws Error if parsing fails
 */
export function parseCompilerOptionsTypes(
  rawJsonString: string,
): readonly string[] {
  const tsconfig = parseTsconfigJsonc(rawJsonString)

  // Safely access possibly undefined properties
  return tsconfig.compilerOptions?.types || []
}

/**
 * Creates edits to modify compiler options types
 * @param rawJsonString The raw tsconfig JSON string
 * @param types The new types array to set
 * @returns The edit operations to apply
 */
export function modifyCompilerOptionsTypes(
  rawJsonString: string,
  types: readonly string[],
): EditResult {
  const jsonPath: JSONPath = ["compilerOptions", "types"]
  const options: ModificationOptions = {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  }

  return modify(rawJsonString, jsonPath, [...types], options)
}
