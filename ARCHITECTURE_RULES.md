# Architecture Rules For Agents (CLAUDE/CODEX)

This rule set applies to `@sito/ui`: a small React + TypeScript library for
headless, reusable interaction primitives used by Sito apps and higher-level
packages.

## Scope

- Library code lives under `src/`.
- The package should expose only low-level UI primitives and their types.
- React and React DOM are peer dependencies. Do not bundle app-level React
  runtimes into the library contract.
- The target public surface is:

```txt
@sito/ui
  Button
  IconButton
  Dialog
  DialogActions
  useDialog
  Tooltip/Popover later
  styles.css / theme.css optional and overrideable
```

# ARCHITECTURE_RULES

## Mandatory Pre-Work

All coding agents (Codex, Claude, or any automated contributor) must read this
file before making any code change.

Before editing:

- Check `git status --short`.
- If there are changes you did not make, ask the developer before acting.
- Study the existing implementation before moving, deleting, or replacing code.
- Do not run scripts unless the developer explicitly allows it.

---

## 1) Scope

- These architecture rules are mandatory for this package.
- Any new component, hook, refactor, export, or file move must follow this
  document.
- If an exception is needed, document it explicitly in the implementation notes
  or pull request.
- Keep this package generic. Domain concepts from countdown, wallet, calendar,
  file browser, dashboard, auth, storage, routing, data fetching, or backend APIs
  do not belong here.

---

## 2) Package Role

`@sito/ui` is the lowest React UI layer in the Sito package tree.

Allowed here:

- Reusable primitives: `Button`, `IconButton`, `Dialog`, `DialogActions`.
- Generic hooks that only manage primitive UI state, such as `useDialog`.
- Generic styling entrypoints, such as `styles.css` and optional `theme.css`.
- Accessibility behavior that every consumer should get consistently.
- Small framework-agnostic helpers needed by these primitives.

Not allowed here:

- Dashboard-specific workflows (`FormDialog`, `ConfirmationDialog`,
  `ImportDialog`, `ExportDialog`, `Page`, `Actions`, tables, filters).
- App providers for mode, notifications, storage, routing, backend clients, or
  translations.
- Domain models, service managers, API clients, localStorage wrappers, or data
  fetching.
- Consumer-specific visual themes that cannot be overridden.

Higher-level packages should depend downward:

```txt
apps / tools
  -> @sito/dashboard-app
  -> @sito/dashboard
  -> @sito/ui
```

`@sito/ui` must not import from `@sito/dashboard`, `@sito/dashboard-app`, or any
consumer app.

---

## 3) Headless-First Component Design

- Components own behavior, semantics, accessibility, and stable DOM hooks.
- Components should not own product identity, domain wording, or app workflows.
- Prefer controlled APIs where state crosses the component boundary.
- Use composition over large prop objects when a primitive starts to grow.
- Do not hide required behavior inside global providers.
- Do not require a `StyleProvider`, `ModeProvider`, translation provider, router,
  query client, storage service, or app shell to render a primitive.

Examples:

- `Dialog` can handle portal rendering, Escape close, backdrop behavior, focus
  initialization, and ARIA wiring.
- `ConfirmationDialog` does not belong here. It belongs in a higher-level package
  because it chooses product copy and workflow semantics.
- `Button` can handle `loading`, `disabled`, `aria-busy`, and press feedback.
- A wallet-specific payment button does not belong here.

---

## 4) State Management

- Keep primitive state local unless it must be controlled by the consumer.
- Expose tiny hooks only when they remove repeated boilerplate without adding a
  provider dependency.
- `useDialog` should manage generic open/close state and return explicit handlers.
- Do not add package-wide context unless multiple primitives truly require shared
  runtime state. Prefer props and composition first.
- Do not read or write `localStorage`, `sessionStorage`, cookies, URL state, or
  external stores from this package.

---

## 5) Accessibility

Accessibility is part of the primitive contract.

- `Button` and `IconButton` must render real `<button>` elements unless there is
  a documented accessibility reason not to.
- `IconButton` must require an accessible label when it has no visible text.
- `Dialog` must expose correct dialog semantics and a clear close contract.
- Focus behavior must be explicit and testable. Dialog focus targets should be
  named options such as `first-input`, `submit`, or `none`, not implicit DOM
  guesses hidden from consumers.
- Escape and backdrop close behavior must be configurable.
- Loading and disabled states must be represented with appropriate HTML and ARIA
  attributes.

---

## 6) Styling Rules

- Use plain CSS for package styles.
- Component CSS must be colocated with the component when it is component-specific.
- Shared package entrypoints may live under `src/styles/`.
- Do not use Tailwind, Emotion, CSS-in-JS, or runtime style injection for the core
  primitive contract.
- Do not require consumers to install a styling runtime just to use the primitives.
- Expose optional overrideable CSS:

```txt
src/styles/theme.css   # CSS custom properties with defaults
src/styles/styles.css  # public stylesheet that imports theme and component CSS
```

- Styling must be overrideable through CSS variables, class names, and stable
  `data-*` attributes.
- The package may ship default styles, but the components must remain usable by
  consumers that replace or override those styles.
- Use `@sito-ui-*` or `sito-ui-*` class prefixes for public CSS hooks to avoid
  collisions in apps.

---

## 7) Design Tokens

- Put default tokens in `src/styles/theme.css`.
- Reference tokens from component CSS instead of scattering visual literals.
- Tokens must be generic, not app-branded.
- Consumers must be able to override tokens at `:root`, app root, or theme scope.

Recommended token families:

```css
--sito-ui-color-*
--sito-ui-space-*
--sito-ui-size-*
--sito-ui-radius-*
--sito-ui-border-*
--sito-ui-shadow-*
--sito-ui-font-*
--sito-ui-motion-*
```

Allowed literals:

- `0`, `100%`, `100vw`, `100vh`, `1fr`, `auto`, and ratio/percentage layout
  values.
- Transition and animation timings when no token exists yet.
- One-off non-theme values where a token would reduce clarity.

When in doubt, add or reuse a token.

---

## 8) Folder Structure

The library is primitive-oriented, not feature-sliced.

```txt
src/
  components/
    Button/
      Button.tsx
      styles.css
      types.ts
      index.ts
    IconButton/
      IconButton.tsx
      styles.css
      types.ts
      index.ts
    Dialog/
      Dialog.tsx
      DialogActions.tsx
      styles.css
      types.ts
      utils.ts
      index.ts
  hooks/
    useDialog/
      useDialog.ts
      types.ts
      index.ts
  styles/
    theme.css
    styles.css
  utils/
    classNames.ts
    index.ts
  main.ts
```

Rules:

- One component per file, except tightly coupled subcomponents such as
  `DialogActions` may live in the same component folder.
- One hook per file.
- Reusable helpers go in `utils.ts` or `src/utils/`.
- Constants go in `constants.ts`.
- Types go in `types.ts`.
- Public exports go through local `index.ts` files and then `src/main.ts`.
- Do not expose private folders through package exports.

---

## 9) Public API and Exports

- Keep the public API small and intentional.
- Export only primitives, hooks, and public types.
- Every exported prop type is a package contract. Avoid leaking implementation
  details from internal components.
- Prefer stable names:

```ts
Button;
ButtonProps;
IconButton;
IconButtonProps;
Dialog;
DialogProps;
DialogActions;
DialogActionsProps;
useDialog;
UseDialogReturn;
```

- `main.ts` is the package entrypoint.
- Package `exports` must include style entrypoints when styles are public:

```json
{
  ".": {
    "types": "./dist/ui.d.ts",
    "import": "./dist/ui.js",
    "require": "./dist/ui.cjs"
  },
  "./styles.css": "./dist/styles.css",
  "./theme.css": "./dist/theme.css"
}
```

---

## 10) Dependency Rules

- Keep runtime dependencies close to zero.
- `react` and `react-dom` must stay in `peerDependencies` and `devDependencies`,
  not runtime `dependencies`.
- Do not add styling runtimes for core primitives.
- Do not add dashboard, router, query, i18n, form, icon-pack, or app-state
  dependencies to this package.
- If a dependency is only needed for build, docs, tests, or stories, it belongs in
  `devDependencies`.
- Before adding a dependency, document why local code would be worse.

---

## 11) i18n and Text

- Do not include domain or app copy in primitives.
- Generic accessibility text can be props, not package-level translations.
- `IconButton` should accept `aria-label` or a dedicated label prop and forward it
  to the real button.
- `Dialog` should not import a translation provider. Consumers pass labels,
  titles, and text.

---

## 12) No Magic Literals

Do not scatter raw literals that carry semantic meaning.

- Closed sets use const objects plus derived types.
- Reused values go in `constants.ts`.
- Public option names should be stable and documented.

Example:

```ts
export const DIALOG_INITIAL_FOCUS = {
  NONE: "none",
  FIRST_INPUT: "first-input",
  SUBMIT: "submit",
} as const;

export type DialogInitialFocus =
  (typeof DIALOG_INITIAL_FOCUS)[keyof typeof DIALOG_INITIAL_FOCUS];
```

Allowed bare literals:

- Trivial local values such as `0`, `1`, `""`, `true`, and `false`.
- Local loop/index math where a name adds no clarity.
- Standard HTML attribute values when they are obvious and not reused.

---

## 13) Cleanup Direction

The library should be reduced to the target primitive set before new primitives
are added.

Keep or build:

- `Button`
- `IconButton`
- `Dialog`
- `DialogActions`
- `useDialog`
- `Tooltip` / `Popover` later
- `styles.css` / `theme.css` as optional overrideable styles
- Tiny utilities needed by those primitives

Remove or move out:

- `ModeProvider`
- `StyleProvider`
- `NotificationProvider`
- `Notification`
- `Error` / `Handler`
- `InputControl`, `TextareaControl`, `SelectControl`
- `Switch`
- `Image`
- `PrintAfter`
- `Loading`, unless `Button` needs a tiny internal spinner
- `SplashScreen`
- legacy `assets/images/logo.svg`
- legacy global animation/style files not used by the target primitives
- Emotion-based style generation
- hooks unrelated to the primitive target, such as screen-width or viewport hooks

Move destination:

- App UX patterns can move to app repos or `@sito/dashboard-app`.
- Dashboard-specific components stay in or move to `@sito/dashboard`.
- Generic but non-essential primitives should wait until the core target is clean.

---

## 14) Implementation Discipline

- Prefer narrow changes.
- Preserve public API only when it is still part of the intended primitive target.
- When deleting or moving legacy exports, document the migration path.
- Avoid compatibility layers that keep obsolete architecture alive.
- Do not broaden the package while cleaning it.
- Static inspection is not runtime verification. If scripts are not allowed, say
  exactly what was checked and which commands the developer can run later.
