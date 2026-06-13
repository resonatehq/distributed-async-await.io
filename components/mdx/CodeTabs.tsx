"use client";

import {
  useState,
  useEffect,
  useCallback,
  useContext,
  useId,
  createContext,
  type ReactNode,
  type ReactElement,
} from "react";

// Tracks how deeply a <Tabs> is nested inside other <Tabs>. The outermost set
// renders as a bordered box with underline tabs; nested sets render as an
// indented segmented control so the reader can always tell the levels apart.
const TabsDepthContext = createContext(0);

interface TabValue {
  label: string;
  value: string;
}

interface CodeTabsProps {
  children: ReactNode;
  labels?: string[];
  defaultValue?: string;
  values?: TabValue[];
  groupId?: string;
}

interface TabItemProps {
  label?: string;
  value?: string;
  children: ReactNode;
}

const STORAGE_PREFIX = "codetabs-group-";

// Known capitalizations for common language/tool names
const knownLabels: Record<string, string> = {
  typescript: "TypeScript",
  python: "Python",
  rust: "Rust",
  go: "Go",
  java: "Java",
  bash: "Bash",
  shell: "Shell",
  ts: "TypeScript",
  js: "JavaScript",
  py: "Python",
  rs: "Rust",
  npm: "npm",
  bun: "Bun",
  yarn: "Yarn",
  pnpm: "pnpm",
  toml: "TOML",
  json: "JSON",
  yaml: "YAML",
};

function capitalizeValue(value: string): string {
  const lower = value.toLowerCase();
  if (knownLabels[lower]) return knownLabels[lower];
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getLabel(
  child: ReactElement<TabItemProps>,
  index: number,
  values?: TabValue[]
): string {
  // 1. If values array provided, match by child's value prop
  if (values && child?.props?.value) {
    const match = values.find((v) => v.value === child.props.value);
    if (match) return match.label;
  }
  // 2. If values array provided, fall back to values[index].label — the array
  //    is a 1:1 ordered mapping; some MDX pipelines drop child props on the
  //    trailing TabItem, so positional match is the safety net.
  if (values && values[index]) return values[index].label;
  // 3. Fall back to child's label prop
  if (child?.props?.label) return child.props.label;
  // 4. Fall back to capitalizing child's value prop
  if (child?.props?.value) return capitalizeValue(child.props.value);
  // 5. Last resort
  return `Tab ${index + 1}`;
}

function getKey(
  child: ReactElement<TabItemProps>,
  index: number,
  values?: TabValue[]
): string {
  // Use value prop as the canonical key if available
  if (child?.props?.value) return child.props.value;
  // Positional fallback from values array (same reason as getLabel).
  if (values && values[index]) return values[index].value;
  return getLabel(child, index, values);
}

export function CodeTabs({ children, labels, defaultValue, values, groupId }: CodeTabsProps) {
  const items = (Array.isArray(children) ? children : [children]) as ReactElement<TabItemProps>[];
  const tabLabels = labels || items.map((child, i) => getLabel(child, i, values));
  const tabKeys = items.map((child, i) => getKey(child, i, values));

  // Determine initial active key
  function getInitialKey(): string {
    if (groupId) {
      try {
        const stored = localStorage.getItem(STORAGE_PREFIX + groupId);
        if (stored && tabKeys.includes(stored)) return stored;
      } catch {
        // localStorage may be unavailable
      }
    }
    if (defaultValue && tabKeys.includes(defaultValue)) return defaultValue;
    return tabKeys[0];
  }

  const [activeKey, setActiveKey] = useState<string>(tabKeys[0]);

  // Initialize from localStorage on mount
  useEffect(() => {
    setActiveKey(getInitialKey());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for cross-component sync via storage events and custom events
  useEffect(() => {
    if (!groupId) return;

    function handleSync(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.groupId === groupId && tabKeys.includes(detail.value)) {
        setActiveKey(detail.value);
      }
    }

    window.addEventListener("codetabs-sync", handleSync);
    return () => window.removeEventListener("codetabs-sync", handleSync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const selectTab = useCallback(
    (key: string) => {
      setActiveKey(key);
      if (groupId) {
        try {
          localStorage.setItem(STORAGE_PREFIX + groupId, key);
        } catch {
          // ignore
        }
        // Dispatch custom event for same-page sync
        window.dispatchEvent(
          new CustomEvent("codetabs-sync", { detail: { groupId, value: key } })
        );
      }
    },
    [groupId]
  );

  const depth = useContext(TabsDepthContext);
  const nested = depth > 0;
  const baseId = useId();

  // Outer tabs wrap content in a bordered box, so the panel needs padding to
  // keep code blocks and trailing links off that border; the inset also lines
  // the content up with where the tab labels start. Nested tabs have no box
  // (just a left rail), so they don't get the extra padding.
  const panelPad = nested ? "" : "p-4";

  const panels = (
    <TabsDepthContext.Provider value={depth + 1}>
      {items.map((child, i) => {
        const key = tabKeys[i];
        return (
          <div
            key={key}
            role="tabpanel"
            id={`${baseId}-panel-${key}`}
            aria-labelledby={`${baseId}-tab-${key}`}
            className={`${activeKey === key ? "block" : "hidden"} ${panelPad}`}
          >
            {child}
          </div>
        );
      })}
    </TabsDepthContext.Provider>
  );

  // Nested tabs: an indented segmented control. The left rail signals the
  // nesting level visually, and the pill control reads as subordinate to the
  // outer underline tabs without re-drawing a full bordered box inside one.
  if (nested) {
    return (
      <div className="my-3 border-l-2 border-bright-gray-200 pl-4 dark:border-primary/10">
        <div
          className="mb-2.5 inline-flex items-center gap-0.5 rounded-lg bg-bright-gray-100 p-0.5 dark:bg-surface-elevated"
          role="tablist"
        >
          {tabKeys.map((key, i) => (
            <button
              key={key}
              role="tab"
              id={`${baseId}-tab-${key}`}
              aria-controls={`${baseId}-panel-${key}`}
              aria-selected={activeKey === key}
              onClick={() => selectTab(key)}
              className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs leading-tight font-mono transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-1 ${
                activeKey === key
                  ? "bg-white text-bright-gray-900 shadow-sm dark:bg-surface-subtle dark:text-primary"
                  : "text-bright-gray-500 hover:text-bright-gray-900 dark:text-muted dark:hover:text-primary"
              }`}
            >
              {tabLabels[i]}
            </button>
          ))}
        </div>
        <div>{panels}</div>
      </div>
    );
  }

  // Outer tabs: bordered box with underline tabs.
  return (
    <div className="my-4 border border-bright-gray-200 dark:border-primary/10">
      <div className="flex border-b border-bright-gray-200 dark:border-primary/10 bg-bright-gray-50 dark:bg-surface-elevated" role="tablist">
        {tabKeys.map((key, i) => (
          <button
            key={key}
            role="tab"
            id={`${baseId}-tab-${key}`}
            aria-controls={`${baseId}-panel-${key}`}
            aria-selected={activeKey === key}
            onClick={() => selectTab(key)}
            className={`inline-flex items-center px-4 py-2.5 text-sm leading-tight font-mono transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-[-2px] ${
              activeKey === key
                ? "text-bright-gray-900 dark:text-secondary border-b-2 border-secondary -mb-px"
                : "text-bright-gray-500 hover:text-bright-gray-900 dark:text-muted dark:hover:text-primary"
            }`}
          >
            {tabLabels[i]}
          </button>
        ))}
      </div>
      <div>{panels}</div>
    </div>
  );
}

export function TabItem({ children }: TabItemProps) {
  return <div>{children}</div>;
}
