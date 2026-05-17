export function Footer() {
  return (
    <footer className="relative border-t border-[var(--ap-border)] bg-[var(--ap-surface-glass)]">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-2 px-4 py-8 text-sm text-[var(--ap-text-muted)] sm:px-6 lg:px-12">
        <p className="font-display font-black text-[var(--ap-text)]">AniManga Hub</p>
        <p>
          Built with the AniPulse theme foundation. Data is shown through public metadata APIs, with official-source discovery and no hosted anime or manga content.
        </p>
      </div>
    </footer>
  );
}
