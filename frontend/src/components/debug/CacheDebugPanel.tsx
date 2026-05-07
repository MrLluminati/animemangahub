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
    <aside className="fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-orange-300/25 bg-slate-950/95 p-4 text-xs text-slate-200 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-orange-300">
            Dev cache
          </p>
          <p className="mt-1 text-sm font-bold text-white">
            {health?.status === "ok" ? "Cache online" : "Cache unavailable"}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-300">
          local
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white/[0.04] p-2">
          <dt className="text-slate-400">Total</dt>
          <dd className="mt-1 text-lg font-black text-white">{stats?.totalEntries ?? health?.totalEntries ?? 0}</dd>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-2">
          <dt className="text-slate-400">Fresh</dt>
          <dd className="mt-1 text-lg font-black text-emerald-300">{stats?.freshEntries ?? 0}</dd>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-2">
          <dt className="text-slate-400">Expired</dt>
          <dd className="mt-1 text-lg font-black text-amber-300">{stats?.expiredEntries ?? 0}</dd>
        </div>
      </dl>

      <div className="mt-3 rounded-xl bg-white/[0.04] p-2">
        <p className="mb-2 font-semibold text-slate-300">Recent cache keys</p>
        {recentEntries.length > 0 ? (
          <ul className="space-y-1">
            {recentEntries.map((entry) => (
              <li key={entry.key} className="flex items-center justify-between gap-2">
                <span className="truncate text-slate-300">{entry.key}</span>
                <span className={entry.isExpired ? "text-amber-300" : "text-emerald-300"}>
                  {entry.isExpired ? "expired" : "fresh"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No cache entries yet.</p>
        )}
      </div>

      <p className="mt-3 text-[0.65rem] text-slate-500">
        Checked: {formatCheckedAt(health?.checkedAt)}
      </p>
    </aside>
  );
}
