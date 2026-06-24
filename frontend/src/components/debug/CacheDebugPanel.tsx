import { getCacheHealth, getCacheStats } from "@/lib/api";

function formatCheckedAt(value?: string) {
  if (!value) {
    return "unknown";
  }

  try {
    return new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(value));
  } catch {
    return "unknown";
  }
}

export async function CacheDebugPanel() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const [health, stats] = await Promise.all([
    getCacheHealth(),
    getCacheStats()
  ]);

  if (!health && !stats) {
    return null;
  }

  const recentEntries = stats?.recentEntries?.slice(0, 3) ?? [];

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-[var(--ap-radius-card)] border border-[var(--ap-border-strong)] bg-[var(--ap-surface-container-lowest)] p-4 text-xs text-[var(--ap-text)] shadow-[var(--ap-shadow-strong)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="anipulse-label text-[0.65rem] text-[var(--ap-primary-active)]">
            Dev cache
          </p>
          <p className="mt-1 text-sm font-bold text-[var(--ap-text)]">
            {health?.status === "ok" ? "Cache online" : "Cache unavailable"}
          </p>
        </div>
        <span className="rounded-[var(--ap-radius-control)] border border-[var(--ap-border)] px-2 py-1 text-[0.65rem] uppercase text-[var(--ap-text-muted)]">
          local
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-2">
        <div className="rounded-[var(--ap-radius-control)] bg-[var(--ap-surface-container)] p-2">
          <dt className="text-[var(--ap-text-muted)]">Total</dt>
          <dd className="mt-1 text-lg font-black text-[var(--ap-text)]">{stats?.totalEntries ?? health?.totalEntries ?? 0}</dd>
        </div>
        <div className="rounded-[var(--ap-radius-control)] bg-[var(--ap-surface-container)] p-2">
          <dt className="text-[var(--ap-text-muted)]">Fresh</dt>
          <dd className="mt-1 text-lg font-black text-[var(--ap-primary-active)]">{stats?.freshEntries ?? 0}</dd>
        </div>
        <div className="rounded-[var(--ap-radius-control)] bg-[var(--ap-surface-container)] p-2">
          <dt className="text-[var(--ap-text-muted)]">Expired</dt>
          <dd className="mt-1 text-lg font-black text-[var(--ap-primary-active)]">{stats?.expiredEntries ?? 0}</dd>
        </div>
      </dl>

      <div className="mt-3 rounded-[var(--ap-radius-control)] bg-[var(--ap-surface-container)] p-2">
        <p className="mb-2 font-semibold text-[var(--ap-text)]">Recent cache keys</p>
        {recentEntries.length > 0 ? (
          <ul className="space-y-1">
            {recentEntries.map((entry) => (
              <li key={entry.key} className="flex items-center justify-between gap-2">
                <span className="truncate text-[var(--ap-text-muted)]">{entry.key}</span>
                <span className="text-[var(--ap-primary-active)]">
                  {entry.isExpired ? "expired" : "fresh"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--ap-text-muted)]">No cache entries yet.</p>
        )}
      </div>

      <p className="mt-3 text-[0.65rem] text-[var(--ap-text-muted)]">
        Checked: {formatCheckedAt(health?.checkedAt)}
      </p>
    </aside>
  );
}
