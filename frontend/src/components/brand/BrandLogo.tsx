import Image from "next/image";
import Link from "next/link";

import { brand } from "@/config/brand";

type BrandLogoProps = {
  compact?: boolean;
  priority?: boolean;
};

export function BrandLogo({ compact = false, priority = false }: BrandLogoProps) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${brand.brandName} home`}>
      <span className="anipulse-brand-mark overflow-hidden">
        <Image
          src={brand.logo.abbreviatedTransparent}
          alt=""
          width={44}
          height={44}
          priority={priority}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-base font-black text-[var(--ap-text)]">
          {brand.brandName}
        </span>
        {!compact ? (
          <span className="anipulse-label block truncate text-[10px] text-[var(--ap-text-muted)]">
            {brand.handle} / {brand.website}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
