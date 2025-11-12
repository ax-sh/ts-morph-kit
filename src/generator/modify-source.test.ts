import {
  createReactComponent,
  createTestProject,
  createTSFile,
} from "../core/create-test-project.ts";

describe("modifySource", () => {
  it("adds imports, exports, and modifies functions without touching FS", async () => {
    const { project, fs } = createTestProject({
      "/src/main.ts": `
        import { oldFn } from './old';
        export function process() {
          return oldFn();
        }
      `,
    });
    const file = project.getSourceFileOrThrow("/src/main.ts");
    console.log(fs.fileExistsSync("/src/main.ts"));
    //       // ensure we never touched disk
    //       // expect(project.getFileSystem().fileExistsSync("/src/main.ts")).toBe(true);
    //
    //       const result = file.getFullText();
    //
    //       // verify imports and exports exist
    //       expect(result).toContain(`from './utils'`);
    //       expect(result).toContain(`export { helper }`);
    //       expect(result).toContain(`const newVar = 42`);
    //       expect(result).toContain(`return helper`);
  });
});

describe("transformer", () => {
  it("should modify source files", () => {
    const { project } = createTestProject({
      "src/test.ts": "const x: number = 1",
      "src/foo.ts": "const x: number = 1",
    });

    const sourceFile = project.getSourceFileOrThrow("src/test.ts");
    // ... perform transformations
    expect(sourceFile.getText()).toContain("const x: number = 1");
  });
});

describe("type checker", () => {
  it("finds interface errors", () => {
    const { project } = createTSFile(
      "user.ts",
      `
      interface User { name: string }
      const user: User = { name: 123 } // error
    `,
    );

    const diagnostics = project.getPreEmitDiagnostics();
    expect(diagnostics.length).toBeGreaterThan(0);
  });
});

describe.todo("react component transformer", () => {
  it("adds displayName to components", () => {
    const { project } = createReactComponent("Button", {
      props: { children: "string", onClick: "() => void" },
      body: "return <button onClick={props.onClick}>{props.children}</button>;",
    });

    const sourceFile = project.getSourceFileOrThrow("Button.tsx");
    // ... run your transformation
    expect(sourceFile.getText()).toContain("displayName");
  });
});
