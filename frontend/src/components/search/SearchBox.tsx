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
        className="anipulse-input flex-1 px-4 py-3 text-sm"
      />
      <button type="submit" className="anipulse-button anipulse-button-primary px-5 py-3 text-sm">
        Search
      </button>
    </form>
  );
}
