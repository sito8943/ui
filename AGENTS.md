# AGENTS.md — @sito/ui

Read `ARCHITECTURE_RULES.md` before any change: it is mandatory for this package.

## Releasing (agents)

When a release is ready (version bump PR or `npm publish`), start from an up-to-date `main`:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
```

Never cut a release from a feature or release branch, or from a stale `main`. Then:

- Branch named after the version (`0.10.2`); the PR only bumps `version` in `package.json` and renames `## Unreleased` to `## x.y.z - YYYY-MM-DD` in `changelog.md`.
- Edit the `version` line by hand: `npm pkg set` may re-sort `package.json` keys.
- Publishing to npm is done by the maintainer, after the release PR is merged and `main` is pulled again.
