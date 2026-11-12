import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  useContextMenu,
} from "@/main";

const SORT_KEYS = ["Name", "Date modified", "Size"] as const;

const FileMenuDemo = () => {
  const menu = useContextMenu<string>();
  const [showHidden, setShowHidden] = useState(false);
  const [sortKey, setSortKey] = useState<string>(SORT_KEYS[0]);
  const [lastAction, setLastAction] = useState("none");

  const run = (action: string) => {
    setLastAction(action);
    menu.close();
  };

  return (
    <div>
      <div
        role="presentation"
        style={{
          display: "grid",
          placeItems: "center",
          height: 240,
          border: "1px dashed var(--sito-ui-color-border)",
          borderRadius: 8,
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          menu.openAt(event.clientX, event.clientY, "report.pdf");
        }}
      >
        Right-click here
      </div>
      <p>Last action: {lastAction}</p>
      <ContextMenu
        open={menu.open}
        position={menu.position}
        onClose={menu.close}
        ariaLabel="File actions"
      >
        <ContextMenuItem shortcut="⌘O" onClick={() => run("open")}>
          Open
        </ContextMenuItem>
        <ContextMenuSubmenu label="Sort by">
          {SORT_KEYS.map((key) => (
            <ContextMenuItem
              key={key}
              checked={sortKey === key}
              onClick={() => {
                setSortKey(key);
                run(`sort by ${key}`);
              }}
            >
              {key}
            </ContextMenuItem>
          ))}
        </ContextMenuSubmenu>
        <ContextMenuSubmenu label="Share">
          <ContextMenuItem onClick={() => run("copy link")}>
            Copy link
          </ContextMenuItem>
          <ContextMenuSubmenu label="Export as">
            <ContextMenuItem onClick={() => run("export pdf")}>
              PDF
            </ContextMenuItem>
            <ContextMenuItem onClick={() => run("export png")}>
              PNG
            </ContextMenuItem>
          </ContextMenuSubmenu>
        </ContextMenuSubmenu>
        <ContextMenuItem
          checked={showHidden}
          onClick={() => {
            setShowHidden((current) => !current);
            run("toggle hidden files");
          }}
        >
          Show hidden files
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Rename</ContextMenuItem>
        <ContextMenuItem
          color="error"
          shortcut="⌘⌫"
          onClick={() => run("delete")}
        >
          Delete
        </ContextMenuItem>
      </ContextMenu>
    </div>
  );
};

const meta = {
  title: "Molecules/ContextMenu",
  component: FileMenuDemo,
} satisfies Meta<typeof FileMenuDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Submenus (hover or ArrowRight), checked rows and a destructive row. */
export const Default: Story = {};
