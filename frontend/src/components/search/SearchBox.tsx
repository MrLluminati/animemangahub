"use client";

import Image from "next/image";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { getSearchSuggestions } from "@/lib/api";
import type { CatalogTitle } from "@/types/catalog";

type SearchBoxProps = {
  defaultValue?: string;
  compact?: boolean;
};

function getTitleHref(item: CatalogTitle) {
  return `/${item.type}/${item.malId}`;
}

export function SearchBox({ defaultValue = "", compact = false }: SearchBoxProps) {
  const router = useRouter();
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const latestQueryRef = useRef("");
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<CatalogTitle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    setQuery(defaultValue);
    setSuggestions([]);
    setIsOpen(false);
  }, [defaultValue]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    latestQueryRef.current = trimmedQuery;

    if (!hasFocus || trimmedQuery.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoadingSuggestions(false);
      return;
    }

    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setIsLoadingSuggestions(true);
      const nextSuggestions = await getSearchSuggestions(trimmedQuery);

      if (!cancelled && latestQueryRef.current === trimmedQuery) {
        setSuggestions(nextSuggestions.slice(0, 3));
        setIsOpen(nextSuggestions.length > 0 || trimmedQuery.length >= 2);
        setIsLoadingSuggestions(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query, hasFocus]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setHasFocus(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/");
      return;
    }

    setHasFocus(false);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  function openSuggestion(item: CatalogTitle) {
    setHasFocus(false);
    setIsOpen(false);
    router.push(getTitleHref(item));
  }

  const shouldShowSuggestions = hasFocus && (isOpen || isLoadingSuggestions);
  const wrapperClass = compact ? "w-full max-w-sm" : "w-full max-w-2xl";

  return (
    <div ref={containerRef} className={`relative ${wrapperClass}`}>
      <form
        action="/search"
        method="get"
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 items-center gap-3"
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
          onFocus={() => {
            setHasFocus(true);
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder="Search anime or manga..."
          className="anipulse-input min-h-12 min-w-0 flex-1 px-4 py-3 text-sm"
          aria-describedby={`${inputId}-hint`}
        />
        <button type="submit" className="anipulse-button anipulse-button-primary min-h-12 shrink-0 px-5 py-3 text-sm">
          Search
        </button>
      </form>

      <p id={`${inputId}-hint`} className="sr-only">
        Type at least two characters to show suggestions. Press Enter to open full search results.
      </p>

      {shouldShowSuggestions ? (
        <div className="anipulse-surface absolute left-0 top-[calc(100%+0.5rem)] z-50 w-full overflow-hidden p-2 shadow-[var(--ap-shadow-strong)]">
          {isLoadingSuggestions && suggestions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-[var(--ap-text-muted)]">Finding suggestions...</div>
          ) : null}

          {!isLoadingSuggestions && suggestions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-[var(--ap-text-muted)]">No suggestions found. Press Enter to search.</div>
          ) : null}

          {suggestions.map((item) => (
            <button
              key={`${item.type}-${item.malId}`}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => openSuggestion(item)}
              className="flex w-full items-center gap-3 rounded-[var(--ap-radius-control)] px-3 py-2 text-left transition hover:bg-[color-mix(in_srgb,var(--ap-primary-active)_12%,transparent)]"
            >
              <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-[var(--ap-surface-container-high)]">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt="" fill sizes="40px" className="object-cover" />
                ) : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-[var(--ap-text)]">{item.title}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.08em] text-[var(--ap-text-muted)]">
                  {item.type}
                  {item.year ? ` • ${item.year}` : ""}
                  {item.score ? ` • ${item.score.toFixed(1)}` : ""}
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
