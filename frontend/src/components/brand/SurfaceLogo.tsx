"use client";

import Image from "next/image";

import { useAniPulseTheme } from "@/components/theme/ThemeProvider";
import { brand } from "@/config/brand";

type LogoFamily = keyof typeof brand.logo.surface;
type LogoSurface = "light" | "dark" | "red";

type SurfaceLogoProps = {
  family: LogoFamily;
  surface?: LogoSurface | "theme";
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export function SurfaceLogo({
  family,
  surface = "theme",
  alt,
  width,
  height,
  priority = false,
  className
}: SurfaceLogoProps) {
  const { mode } = useAniPulseTheme();
  const surfaceRole = surface === "theme" ? mode : surface;

  return (
    <Image
      src={brand.logo.surface[family][surfaceRole]}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
