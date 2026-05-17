import Link from "next/link";

type FilterOption = {
  label: string;
  value: string;
};

type CatalogFiltersProps = {
  action: "/anime" | "/manga";
  selectedGenre?: string;
  selectedYear?: string;
  selectedStatus?: string;
  statusOptions: FilterOption[];
};

const GENRE_OPTIONS: FilterOption[] = [
  { label: "Action", value: "1" },
  { label: "Adventure", value: "2" },
  { label: "Comedy", value: "4" },
  { label: "Drama", value: "8" },
  { label: "Fantasy", value: "10" },
  { label: "Romance", value: "22" },
  { label: "Sci-Fi", value: "24" },
  { label: "Sports", value: "30" },
  { label: "Slice of Life", value: "36" },
  { label: "Supernatural", value: "37" }
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS: FilterOption[] = Array.from({ length: 15 }, (_, index) => {
  const year = CURRENT_YEAR - index;
  return { label: String(year), value: String(year) };
});

export function CatalogFilters({
  action,
  selectedGenre,
  selectedYear,
  selectedStatus,
  statusOptions
}: CatalogFiltersProps) {
  return (
    <form
      action={action}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Genre</span>
          <select
            name="genre"
            defaultValue={selectedGenre ?? ""}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
          >
            <option value="">Any genre</option>
            {GENRE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Year</span>
          <select
            name="year"
            defaultValue={selectedYear ?? ""}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
          >
            <option value="">Any year</option>
            {YEAR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Status</span>
          <select
            name="status"
            defaultValue={selectedStatus ?? ""}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
          >
            <option value="">Any status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
          >
            Apply filters
          </button>
          <Link
            href={action}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-orange-300 hover:text-orange-200"
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
}
