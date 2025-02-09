import { expect, test, describe, it } from "bun:test";
import { getDefaultViteConfig } from "./vite.ts";
import { createTestSourceFile } from "../index.ts";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

describe("", () => {
  it("should load vite config", () => {
    const config = getDefaultViteConfig();
    expect(config).toBeDefined();
    console.log(config);
  });
  it("should ", async () => {
    const sf = await createTestSourceFile(`
        import react from '@vitejs/plugin-react';
        import UnoCSS from 'unocss/vite';
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        
        });
`);
    console.log(sf);
  });
});
