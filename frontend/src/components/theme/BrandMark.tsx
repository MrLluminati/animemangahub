import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="anipulse-brand-mark">AP</span>
      <span>
        <span className="block font-display text-base font-black tracking-[-0.04em] text-[var(--ap-text)]">
          AniManga Hub
        </span>
        <span className="anipulse-label block text-[10px] text-[var(--ap-text-muted)]">
          Powered by AniPulse
        </span>
      </span>
    </Link>
  );
}
