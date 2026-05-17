import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ThemeButtonProps<TElement extends ElementType> = {
  as?: TElement;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function ThemeButton<TElement extends ElementType = "button">({
  as,
  variant = "primary",
  children,
  className = "",
  ...props
}: ThemeButtonProps<TElement>) {
  const Component = as ?? "button";
  const variantClass = variant === "primary" ? "anipulse-button-primary" : "anipulse-button-secondary";

  return (
    <Component className={`anipulse-button ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
