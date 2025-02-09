import { expect, test, describe, it } from "bun:test";
import {getDefaultViteConfig} from "./vite.ts";

test("2 + 2", () => {
    expect(2 + 2).toBe(4);
});

describe('', () => {
    it("should load vite config", ()=>{
        const config = getDefaultViteConfig()
        expect(config).toBeDefined()
        console.log(config)
    })
});