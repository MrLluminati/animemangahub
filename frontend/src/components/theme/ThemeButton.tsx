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
  const sizeClass =
    "min-h-[44px] whitespace-nowrap px-5 py-2.5 text-sm leading-none sm:min-h-[46px] sm:px-6 sm:py-3";

  return (
    <Component className={`anipulse-button ${variantClass} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
