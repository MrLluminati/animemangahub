"use client";

import { useRouter } from "next/navigation";

import type { SearchSort } from "@/lib/api";

type SearchSortSelectProps = {
  query: string;
  currentSort: SearchSort;
};

const sortOptions: Array<{ value: SearchSort; label: string }> = [
  { value: "relevance", label: "Most relevant" },
  { value: "popularity", label: "Most popular" },
  { value: "score", label: "Highest rated" },
  { value: "year", label: "Newest" }
];

export function SearchSortSelect({ query, currentSort }: SearchSortSelectProps) {
  const router = useRouter();

  function handleSortChange(nextSort: SearchSort) {
    const params = new URLSearchParams({ q: query, sort: nextSort });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <label className="flex w-full max-w-xs flex-col gap-2 text-sm text-[var(--ap-text-muted)] sm:w-64">
      <span className="anipulse-label text-[0.65rem]">Sort results</span>
      <select
        value={currentSort}
        onChange={(event) => handleSortChange(event.target.value as SearchSort)}
        className="anipulse-input min-h-12 w-full cursor-pointer rounded-[var(--ap-radius-control)] px-4 py-3 text-sm font-semibold"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
