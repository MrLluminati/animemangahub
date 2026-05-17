"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBoxProps = {
  defaultValue?: string;
  compact?: boolean;
};

export function SearchBox({ defaultValue = "", compact = false }: SearchBoxProps) {
  const router = useRouter();
  const inputId = useId();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form
      action="/search"
      method="get"
      onSubmit={handleSubmit}
      className={compact ? "flex w-full max-w-xs gap-2" : "flex w-full max-w-2xl gap-3"}
      role="search"
      aria-label="Search anime and manga"
    >
      <label htmlFor={inputId} className="sr-only">
        Search anime or manga
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search anime or manga..."
        className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
      />
      <button
        type="submit"
        className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
      >
        Search
      </button>
    </form>
  );
}
