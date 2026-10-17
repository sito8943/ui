# @sito/ui

Low-level React UI primitives for Sito packages and apps.

## Install Styles

Styles are optional. Import the full stylesheet when you want the default theme
and component styles:

```ts
import "@sito/ui/styles.css";
```

Import only the theme variables when you want to provide component CSS yourself:

```ts
import "@sito/ui/theme.css";
```

## Public API

```ts
import {
  Button,
  BUTTON_COLOR_VARIANTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  Dialog,
  DialogActions,
  DIALOG_INITIAL_FOCUS,
  IconButton,
  ICON_BUTTON_SIZES,
  Spinner,
  useContextMenu,
  useDialog,
} from "@sito/ui";
```

The runtime constants `BUTTON_COLOR_VARIANTS`, `BUTTON_VARIANTS`,
`BUTTON_SIZES`, `ICON_BUTTON_SIZES`, and `DIALOG_INITIAL_FOCUS` expose the
supported values for public component contracts.

Exported types include `ButtonProps`, `ButtonSize`, `IconButtonProps`,
`DialogProps`, `DialogActionsProps`, `DialogState`, `IconButtonSize`, and
`SpinnerProps`, `UseDialogReturn`, plus the corresponding context-menu props and hook return
types.

## Spinner

`Spinner` is the shared indeterminate-progress primitive used by `Button`
loading states and standalone feedback. Provide `label` when the spinner owns
the accessible loading announcement; omit it when surrounding content already
provides that context.

```tsx
<Spinner label="Loading messages" />
<Spinner />
```

## Context Menu

`ContextMenu` owns viewport clamping, focus restoration, outside dismissal and
keyboard navigation. Consumers own the menu's actions and wording:

```tsx
const menu = useContextMenu<string>();

<button
  type="button"
  onContextMenu={(event) => {
    event.preventDefault();
    menu.openAt(event.clientX, event.clientY, "item-id");
  }}
>
  Item
</button>

<ContextMenu
  open={menu.open}
  position={menu.position}
  onClose={menu.close}
  ariaLabel="Item actions"
>
  <ContextMenuItem onClick={menu.close}>Open</ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem disabled>Delete</ContextMenuItem>
</ContextMenu>;
```

Apps with an existing overlay or hotkey scope can keep dismissal in that layer
with `closeOnEscape={false}`, `closeOnTab={false}` and
`closeOnPointerDownOutside={false}`. The component forwards its menu element ref
for adapters that need compatible positioning or containment checks. Those
adapters may also use `clampToViewport={false}` when their existing state layer
already owns clamping.

## Button Sizes

`Button` supports `size="sm" | "md" | "lg"` for padding and height. `md` is
the default size.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Icon Button Sizes

`IconButton` supports `size="sm" | "md" | "lg"` for the button container.
`md` is the default size.

```tsx
<IconButton aria-label="Add" icon="+" size="sm" />
<IconButton aria-label="Add" icon="+" size="md" />
<IconButton aria-label="Add" icon="+" size="lg" />
```

The container sizes are `28px`, `40px`, and `48px`; their default icon sizes
are `16px`, `20px`, and `24px`. Override a specific token
(`--sito-ui-size-icon-button-icon-sm`, `-md`, or `-lg`) for theme-wide changes,
or use `iconSize` / `--sito-ui-icon-button-icon-size` for one button.

## Motion

Buttons shrink while pressed and return to their normal size on release. The
press transition uses `--sito-ui-motion-duration-press` (`100ms`) and
`--sito-ui-motion-easing-press`; `Button` uses
`--sito-ui-button-active-scale` (`0.97`), while `IconButton` uses
`--sito-ui-icon-button-active-scale` (`0.9`). Override these tokens to tune the
feedback. With `prefers-reduced-motion: reduce`, the press scale and its
transition are disabled. The spinner keeps spinning at its reduced-motion
duration.

## Buttons as Links

`Button` and `IconButton` render a native `<button>` by default. Use `as` to
render a link with the same classes, sizes, variants and colors:

```tsx
import { Link } from "react-router";

<Button as="a" href="/report.pdf" download>Download PDF</Button>
<IconButton as="a" href="/docs" target="_blank" rel="noreferrer" aria-label="Docs" icon={<DocsIcon />} />
<IconButton as={Link} to="/" aria-label="Exit" icon={<ExitIcon />} />
```

Props follow the rendered element: anchor attributes with `as="a"`, the
component's props with `as={Link}`. Use links for navigation and downloads so
users keep new-tab, copy-link and the URL preview; keep `<button>` for actions.

- `type` defaults to `"button"` only for `<button>`.
- `disabled` (and `loading`) on a link sets `aria-disabled="true"`,
  `tabIndex={-1}` and blocks click and middle-click navigation. Router links
  that skip navigation on `event.defaultPrevented` (React Router does) stay put.
- `ref` points to the rendered element.

## Development

Run the component test suite with:

```sh
pnpm test:run
```

Start Storybook with:

```sh
pnpm storybook
```

## Dialog Exit Transitions

`Dialog` unmounts immediately by default. Pass `exitDurationMs` when a consumer
needs to keep the portal mounted long enough for a CSS exit animation:

```tsx
<Dialog open={open} onClose={close} exitDurationMs={220}>
  Dialog content
</Dialog>
```

During that delay, the backdrop and dialog expose `data-state="closing"` plus
`sito-ui-dialog-backdrop--closing` and `sito-ui-dialog--closing` classes.
Use those hooks from consumer CSS to define the actual animation.

## Scope

This package only exposes generic primitives. It does not include dashboard
workflows, forms, translations, icon packs, routing, storage, providers, or data
fetching.
