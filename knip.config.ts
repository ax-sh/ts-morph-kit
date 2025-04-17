import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: [
    "src/components/ui/**",
    "src/routeTree.gen.ts",
    "src/utils/test-utils.ts",
  ], // : ['createMemorySourceFile'],
  ignoreDependencies: [
    "@vitest/coverage-v8",
    "@biomejs/biome",
    "@release-it/conventional-changelog",
    "is-ci",
    "git-cliff",
    "oxlint",
  ],
  ignoreBinaries: ["nr", "repo"],
  ignoreExportsUsedInFile: {
    interface: true,
    type: true,
  },
}

export default config
