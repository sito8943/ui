# Changelog

## 0.9.0 - 2026-10-25

### Added

- `Toast` takes `variant`: `accent` (default) or `filled`, per toast or as
  `ToastProvider`'s default. Filled success, error and warning toasts use the
  color's `-default` token as background and its `-text` token for text,
  icon, action and close; `default` toasts keep the surface (#58).
- `--sito-ui-toast-accent-width` and `--sito-ui-toast-accent-border` size and
  color the toast's left stripe, so it can become a plain border with tokens
  only (#56).
- `ContextMenu` animates its exit: it stays mounted with
  `data-state="closed"` for `--sito-ui-motion-duration-normal` (fade and
  scale), takes no pointer or keys meanwhile, and gives focus back to the
  trigger when closing starts. Reduced motion skips the animation (#59).

## 0.8.0 - 2026-10-20

### Added

- `Tooltip` takes an optional `hotkey`: the control's keyboard shortcut, shown
  after the label in a `<kbd>` themed with `--sito-ui-tooltip-hotkey-*` tokens.

## 0.7.0 - 2026-10-20

### Added

- Added `Toast`, `ToastProvider`, and `useToast`: generic notifications with
  `default`, `success`, `error`, and `warning` colors, optional icon and
  action, auto-dismiss that pauses on hover and focus, update in place,
  Escape to dismiss, a stack limit, six placements, and enter and exit
  transitions themed with `--sito-ui-toast-*` tokens (#53).
- `Dialog`'s header (title and close button) stays visible while a tall dialog
  scrolls (#51).
- `DialogActions` stays visible at the bottom while a tall dialog scrolls
  (#52).

### Fixed

- Defined `--sito-ui-dialog-max-width` (`32rem`) in `theme.css`, with the same
  fallback in the dialog styles, so dialogs no longer shrink or grow to fit
  their content (#50).

## 0.6.1 - 2026-10-19

### Fixed

- Fixed `DialogActions` types so `primaryProps`, `cancelProps`, and
  `extraActions` accept polymorphic `as` values such as anchors and router
  links (#48).
- Added TypeScript checks for tests to CI.

## 0.6.0 - 2026-10-19

### Added

- Added `Tooltip`: shows a label on pointer hover or keyboard focus, stays
  inside the viewport, dismisses with Escape and is themed with
  `--sito-ui-tooltip-*` tokens (#43).
- Added built-in `Dialog` enter and exit transitions, with configurable motion
  tokens and delayed unmounting through `exitDurationMs` and
  `onExitComplete` (#46).
- `DialogActions` accepts `primaryProps` and `cancelProps` (including `as` and
  link attributes), so either action can render as a link (#45).
- `Dialog` accepts `closeButtonColor` to set the close button color (#44).

### Changed

- `Dialog`'s close button now uses the neutral text color instead of always
  `error`. Pass `closeButtonColor="error"` for the previous red button (#44).
- `DialogActions`' `cancelText` and `onCancel` are optional; omit `cancelText`
  to leave out the cancel action (#45).
- `Dialog`'s `exitDurationMs` now defaults to the
  `--sito-ui-dialog-exit-duration` token (`180ms`), instead of `0` (immediate
  unmount). Dialogs now animate on close and unmount and call `onExitComplete`
  after 180ms. Pass `exitDurationMs={0}` for the previous immediate behavior
  (#46).
- The built-in dialog animation uses unlayered CSS and overrides consumer
  animation utilities on the dialog and backdrop. Consumers with their own
  dialog animation should remove it or set the dialog duration tokens to `0ms`
  (#46).

## 0.5.1 - 2026-10-17

### Changed

- Made button press feedback faster with dedicated motion tokens and a stronger
  scale for `IconButton` (#41).

### Fixed

- Disabled button press scaling and its transform transition when the user
  prefers reduced motion (#40).

## 0.5.0 - 2026-10-16

### Added

- `Button` and `IconButton` accept a polymorphic `as` prop to render an anchor
  (`as="a"`) or a router link (`as={Link}`) with the same classes, sizes,
  variants and colors (#37). Props and `ref` follow the rendered element.
  Disabled or loading links get `aria-disabled="true"`, leave the tab order
  and block navigation. `type` only defaults on `<button>`.
- Exported `ButtonOwnProps`, `ButtonRef` and `IconButtonOwnProps` types.
  `ButtonProps` and `IconButtonProps` take an optional element type parameter
  (default `"button"`).

### Changed

- Button hover, active and pointer styles use
  `:not(:disabled):not([aria-disabled="true"])` instead of `:enabled`, so they
  also apply to links. Buttons drop `text-decoration`.
- `Button` and `IconButton` take `ref` as a regular prop (React 19) instead of
  `forwardRef`. Usage is unchanged; `ref` points to the rendered element.

## 0.4.2 - 2026-10-09

### Fixed

- Fixed native `<select>` options rendering with unreadable colors in dark
  themes (#1). Added the `--sito-ui-color-scheme` token (default `light`),
  applied as `color-scheme` on `:root` and `select`. Dark themes should set
  `--sito-ui-color-scheme: dark`.

## 0.4.0 - 2026-08-30

### Added

- Added `ContextMenu`, `ContextMenuItem`, and `ContextMenuSeparator` primitives
  with portal rendering, viewport clamping (`clampToViewport`,
  `viewportPadding`), configurable dismissal (`closeOnEscape`, `closeOnTab`,
  `closeOnPointerDownOutside`), focus restore on close, and roving keyboard
  navigation (`ArrowUp`, `ArrowDown`, `Home`, `End`).
- Added `ContextMenuItem` `leading` and `shortcut` slots, plus exported
  `ContextMenuProps`, `ContextMenuItemProps`, `ContextMenuSeparatorProps`, and
  `ContextMenuPosition` types.
- Added `useContextMenu` hook (`open`, `position`, `payload`, `openAt`,
  `close`) with the exported `UseContextMenuReturn` type.
- Added `Spinner` primitive for indeterminate progress. It is decorative by
  default (`aria-hidden`) and becomes `role="status"` with an accessible name
  when `label` is provided. Exported `SpinnerProps`.
- Added public constants `BUTTON_VARIANTS`, `BUTTON_COLOR_VARIANTS`,
  `BUTTON_SIZES`, `ICON_BUTTON_SIZES`, and `DIALOG_INITIAL_FOCUS`.
- Added CSS tokens for the context menu (`--sito-ui-size-context-menu-*`,
  `--sito-ui-radius-context-menu*`, `--sito-ui-shadow-context-menu`,
  `--sito-ui-z-index-context-menu`, `--sito-ui-context-menu-disabled-opacity`,
  `--sito-ui-font-size-context-menu-shortcut`) and `--sito-ui-color-text-muted`.
- Added generic spinner tokens `--sito-ui-size-spinner`,
  `--sito-ui-spinner-border-width`, `--sito-ui-motion-duration-spinner`, and
  `--sito-ui-motion-duration-spinner-reduced`.
- Added tests for `ContextMenu`, `Spinner`, and `useContextMenu`, and a
  `Spinner` Storybook story.
- Added `pnpm-workspace.yaml` mirroring the `package.json` `pnpm` overrides in
  preparation for pnpm 11.

### Changed

- Updated `Button` to render its loading indicator with `Spinner`; the
  `sito-ui-button__spinner` class and `data-sito-ui="button-spinner"` hook are
  preserved.
- Updated `--sito-ui-size-button-spinner`,
  `--sito-ui-button-spinner-border-width`, `--sito-ui-motion-duration-spin`,
  and `--sito-ui-motion-duration-spin-reduced` to alias the new spinner tokens
  (existing overrides keep working).
- Updated `ARCHITECTURE_RULES.md` and the README with the new primitives, hook,
  constants, and token docs.
- Marked `esbuild` as an ignored built dependency in the pnpm config.

## 0.3.3 - 2026-07-17

### Added

- Added `headerClassName`, `titleClassName`, and `closeButtonClassName` to
  `Dialog` so higher-level wrappers can customize its header, title, and close
  button styles.
- Added test coverage for the new `Dialog` class hooks and stacked-dialog
  dismissal behavior.

### Fixed

- Updated stacked dialogs so only the topmost dialog handles Escape and
  backdrop dismissal.
- Prevented a background dialog from restoring focus while a dialog above it
  is still active.

## 0.3.1 - 2026-07-15

### Added

- Added per-size icon tokens for `IconButton`
  (`--sito-ui-size-icon-button-icon-sm`, `-md`, `-lg`) so each container size
  gets a matching default icon size (`16px`, `20px`, `24px`).

### Changed

- Updated `IconButton` size classes to set the icon size from the new per-size
  tokens, while `iconSize` / `--sito-ui-icon-button-icon-size` still override a
  single button.
- Updated the README `IconButton` sizing docs with the default icon sizes and
  token override guidance.
- Updated dependencies via `pnpm-lock.yaml` refresh.

## 0.3.0 - 2026-07-10

### Added

- Added `Dialog` exit-transition support with `exitDurationMs`,
  `onExitComplete`, `DialogState`, and `data-state`/state class hooks.
- Added `Button` size support with `size="sm" | "md" | "lg"`, exported
  `ButtonSize`, and CSS tokens for 32px, 40px, and 48px button heights.
- Added `IconButton` container size support with `size="sm" | "md" | "lg"`,
  exported `IconButtonSize`, and separate `iconSize` control for the icon.
- Added Vitest and Testing Library setup with coverage for `Button`,
  `IconButton`, `Dialog`, `DialogActions`, and `useDialog`.
- Added Storybook setup and primitive stories for `Button`, `IconButton`,
  `Dialog`, and `DialogActions`.

### Changed

- Updated `IconButton` to adapt to visible content while preserving circular
  icon-only buttons.
- Updated `IconButton` loading and icon styling so icon size stays independent
  from the container size.
- Updated `Button` size styling so size controls both padding and explicit
  height.

### Fixed

- Ignored generated `storybook-static` output.

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
