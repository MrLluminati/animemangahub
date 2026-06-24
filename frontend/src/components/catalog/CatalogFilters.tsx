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
      className="anipulse-surface p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex-1 space-y-2">
          <span className="anipulse-label text-xs text-[var(--ap-text-muted)]">Genre</span>
          <select
            name="genre"
            defaultValue={selectedGenre ?? ""}
            className="anipulse-input w-full px-4 py-3 text-sm"
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
          <span className="anipulse-label text-xs text-[var(--ap-text-muted)]">Year</span>
          <select
            name="year"
            defaultValue={selectedYear ?? ""}
            className="anipulse-input w-full px-4 py-3 text-sm"
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
          <span className="anipulse-label text-xs text-[var(--ap-text-muted)]">Status</span>
          <select
            name="status"
            defaultValue={selectedStatus ?? ""}
            className="anipulse-input w-full px-4 py-3 text-sm"
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
            className="anipulse-button anipulse-button-primary px-5 py-3 text-sm"
          >
            Apply filters
          </button>
          <Link
            href={action}
            className="anipulse-button anipulse-button-secondary px-5 py-3 text-sm"
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
}
