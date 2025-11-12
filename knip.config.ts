import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: ["src/utils/test-utils.ts"], // : ['createMemorySourceFile'],
  ignoreDependencies: [
    "@vitest/coverage-v8",
    "@biomejs/biome",
    "@release-it/conventional-changelog",
    "is-ci",
    "git-cliff",
    "oxlint",
    "renovate",
  ],
  ignoreBinaries: ["nr", "repo", "act"],
  ignoreExportsUsedInFile: {
    interface: true,
    type: true,
  },
}

export default config
