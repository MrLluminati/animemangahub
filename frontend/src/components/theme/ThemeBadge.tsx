import type { ReactNode } from "react";

type ThemeBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function ThemeBadge({ children, className = "" }: ThemeBadgeProps) {
  return <span className={`anipulse-badge ${className}`.trim()}>{children}</span>;
}
