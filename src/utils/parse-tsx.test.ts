import type { JsxElement } from "ts-morph";
import { SyntaxKind } from "ts-morph";
import { createTestSourceFile, createTestTsxSourceFile } from "./test-utils.ts";

const code = `
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`

function wrapWithTag(jsxElement: JsxElement, tag: string) {
  const newJsxText = `
    <${tag}>
      ${jsxElement.getText()}
    </${tag}>
  `;
  // Replace the original JSX element with the new wrapped version
  jsxElement.replaceWithText(newJsxText);
}

describe('tsx mutate test', () => {
  // it('should tsx mutate test', async () => {
  //   const sourceFile = await createTestSourceFile(code)
  //   const returnStatement = sourceFile.getFirstDescendantByKind(SyntaxKind.ReturnStatement);
  //   const jsxElement = returnStatement?.getFirstDescendantByKind(SyntaxKind.JsxElement);
  //   if (jsxElement) {
  //
  //     const text = jsxElement.getText();
  //     console.log(text)
  //     expect(text).toBeDefined()
  //   }
  //
  // });
  it('should wrap with custom tsx tag', async () => {
    const sourceFile = await createTestTsxSourceFile(code)
    // Find the return statement containing the JSX
    const returnStatement = sourceFile.getFirstDescendantByKind(SyntaxKind.ReturnStatement);
    const jsxElement = returnStatement.getFirstDescendantByKind(SyntaxKind.JsxElement);

    if (jsxElement) {
      const tag = 'Provvv'
      wrapWithTag(jsxElement, tag);
    }// Format the document to ensure proper indentation
    sourceFile.formatText();

    console.log(sourceFile.getText());
    sourceFile.saveSync();
  });
});
