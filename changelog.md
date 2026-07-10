# Changelog

## 0.3.0 - 2026-07-10

### Added

- Added `Dialog` exit-transition support with `exitDurationMs`,
  `onExitComplete`, `DialogState`, and `data-state`/state class hooks.

## 0.1.0 - 2026-07-09

### Added

- Added a `format` script to run Prettier with `prettier . --write`.
- Added a GitHub Actions workflow for linting, format checking, and building.
- Added Dependabot configuration for npm dependencies and GitHub Actions updates.
- Added JSDoc descriptions for the dialog components, dialog utilities, `useDialog`, and `classNames`.

### Changed

- Restored `DIALOG_INITIAL_FOCUS` as a const object and derived `DialogInitialFocus` from it.
- Removed the deprecated TypeScript `baseUrl` option from `tsconfig.json`.
- Updated enabled buttons to use `cursor: pointer` while keeping disabled buttons as `not-allowed`.

### Fixed

- Imported the dialog focus helpers and selector constants used by `Dialog`.
- Replaced the loose `any` JSDoc annotation in `classNames` with the concrete parameter description.
