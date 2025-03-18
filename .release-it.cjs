/**
 https://github.com/release-it/release-it/blob/main/config/release-it.json
 https://github.com/release-it/release-it/blob/main/docs/github-releases.md
 @gen token with scope https://github.com/settings/tokens/new?scopes=repo&description=release-it
 NOTE use .cjs or .js for this config .mjs does not work
 @docs docs https://github.com/release-it/release-it/blob/main/docs/configuration.md
 */

/** @type {import('release-it').Config} */
module.exports = {
  github: {
    release: false,
  },
  npm: {
    publish: false,
  },
  git: {
    changelog: 'nr git-cliff --unreleased --strip all | sed "1d"',
    requireCleanWorkingDir: true,
    requireBranch: false,
    requireUpstream: true,
    requireCommits: false,
    requireCommitsFail: true,
    commitsPath: "",
    addUntrackedFiles: false,
    commit: true,
    commitMessage: "Release ${version}",
    commitArgs: [],
    tag: true,
    tagExclude: null,
    tagName: null,
    tagMatch: null,
    getLatestTagFromAllRefs: false,
    tagAnnotation: "Release ${version}",
    tagArgs: [],
    push: true,
    pushArgs: ["--follow-tags"],
    pushRepo: "",
  },
  hooks: {
    "before:init": [
      "nr format",
      'git commit --allow-empty -am "ci: format files before release"',
      "nr lint",
    ],
    "before:beforeBump": [
      "echo \uD83D\uDC4A ${name} before:bump latestVersion=v${version} previousVersion=v${latestVersion}",
    ],
    "after:bump": [
      "nr git-cliff -o CHANGELOG.md && git add CHANGELOG.md",
      'git commit  --allow-empty -am "ci: add CHANGELOG"',
      "echo \uD83D\uDC4A ${name} after:bump version=v${version} latestVersion=v${latestVersion}",
    ],
    "after:release": [
      "echo \uD83D\uDE4C Successfully released ${name} v${version} to ${repo.repository}.",
      'nr is-ci && echo "running in ci" || git push origin HEAD',
      "git push origin refs/heads/master:master",
      "nr build",
      "nr gh:pub",
      // 'git push origin refs/heads/develop:develop',
    ],
  },
}
