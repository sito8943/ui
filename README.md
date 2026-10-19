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
  Tooltip,
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

## Tooltip

Wrap a single trigger to show its visible label on pointer hover or keyboard
focus. The tooltip is decorative and hidden from assistive technology, so keep
an accessible name on icon-only controls:

```tsx
<Tooltip label="Next slide" side="top" align="center">
  <IconButton aria-label="Next slide" icon={<NextIcon />} />
</Tooltip>
```

`side` supports `top` and `bottom`; `align` supports `start`, `center`, and
`end`. Hover is enabled only on devices that support hover. Press Escape to
dismiss it while the trigger is focused. Tooltip surface, text, radius, shadow,
font size, and motion can be customized with `--sito-ui-tooltip-*` tokens.
The tooltip stacks above context menus using `--sito-ui-z-index-tooltip`.

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

`Dialog` fades in with a small rise and scale, then fades out when closed. It
stays mounted for the exit animation before restoring focus and releasing body
scroll. Set `exitDurationMs` to override the default 180 ms exit duration; `0`
unmounts immediately:

```tsx
<Dialog open={open} onClose={close} exitDurationMs={220}>
  Dialog content
</Dialog>
```

The `--sito-ui-dialog-enter-duration`, `--sito-ui-dialog-exit-duration`, and
`--sito-ui-dialog-enter-transform` theme tokens tune the built-in animation.
Setting both durations to `0ms` disables it. Reduced-motion preferences disable
the animation and exit delay automatically.

The built-in animation uses unlayered CSS, so it overrides consumer animation
utilities on the dialog and backdrop. If you provide your own dialog animation,
remove those utilities or set both dialog duration tokens to `0ms`. Focus is
restored after the exit animation only when focus remains in the closing dialog
or has fallen back to the document body.

The close button uses the neutral text color by default. Set
`closeButtonColor="error"` on `Dialog` when a red close button is preferred.

`DialogActions` accepts `primaryProps` and `cancelProps` to pass button props,
including `as` and link attributes. Omit `cancelText` to leave out the cancel
action:

```tsx
<DialogActions
  primaryText="Sign in"
  primaryProps={{ as: Link, to: "/sign-in/" }}
/>
```

## Scope

This package only exposes generic primitives. It does not include dashboard
workflows, forms, translations, icon packs, routing, storage, providers, or data
fetching.
