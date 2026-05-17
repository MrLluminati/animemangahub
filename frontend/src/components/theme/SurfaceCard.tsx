import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type SurfaceCardProps<TElement extends ElementType> = {
  as?: TElement;
  children: ReactNode;
  elevated?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function SurfaceCard<TElement extends ElementType = "div">({
  as,
  children,
  elevated = false,
  className = "",
  ...props
}: SurfaceCardProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component className={`anipulse-surface ${elevated ? "anipulse-surface-elevated" : ""} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
