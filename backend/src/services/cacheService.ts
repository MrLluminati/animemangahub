import { prisma } from "../lib/prisma";

type CacheFactory<T> = () => Promise<T>;

export type CacheResult<T> = {
  data: T;
  meta: {
    key: string;
    source: string;
    cacheStatus: "hit" | "miss" | "stale";
    fetchedAt: string;
    expiresAt: string;
  };
};

function buildExpiryDate(ttlSeconds: number) {
  return new Date(Date.now() + ttlSeconds * 1000);
}

function logCacheEvent(status: "hit" | "miss" | "stale", key: string) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`[cache:${status}] ${key}`);
  }
}

export async function getOrSetCache<T>(
  key: string,
  ttlSeconds: number,
  factory: CacheFactory<T>,
  source = "jikan"
): Promise<T> {
  const result = await getOrSetCacheWithMeta(key, ttlSeconds, factory, source);
  return result.data;
}

export async function getOrSetCacheWithMeta<T>(
  key: string,
  ttlSeconds: number,
  factory: CacheFactory<T>,
  source = "jikan"
): Promise<CacheResult<T>> {
  const cached = await prisma.apiCache.findUnique({
    where: { key }
  });

  const now = new Date();

  if (cached && cached.expiresAt > now) {
    logCacheEvent("hit", key);

    return {
      data: JSON.parse(cached.payload) as T,
      meta: {
        key,
        source: cached.source,
        cacheStatus: "hit",
        fetchedAt: cached.fetchedAt.toISOString(),
        expiresAt: cached.expiresAt.toISOString()
      }
    };
  }

  logCacheEvent(cached ? "stale" : "miss", key);

  const fresh = await factory();
  const payload = JSON.stringify(fresh);
  const expiresAt = buildExpiryDate(ttlSeconds);

  const saved = await prisma.apiCache.upsert({
    where: { key },
    update: {
      payload,
      source,
      fetchedAt: now,
      expiresAt
    },
    create: {
      key,
      payload,
      source,
      fetchedAt: now,
      expiresAt
    }
  });

  return {
    data: fresh,
    meta: {
      key,
      source: saved.source,
      cacheStatus: cached ? "stale" : "miss",
      fetchedAt: saved.fetchedAt.toISOString(),
      expiresAt: saved.expiresAt.toISOString()
    }
  };
}

export async function getCacheHealth() {
  const totalEntries = await prisma.apiCache.count();

  return {
    status: "ok",
    provider: "sqlite",
    cacheTable: "ApiCache",
    totalEntries,
    checkedAt: new Date().toISOString()
  };
}

export async function getCacheStats() {
  const now = new Date();

  const [totalEntries, freshEntries, expiredEntries, entries] = await Promise.all([
    prisma.apiCache.count(),
    prisma.apiCache.count({ where: { expiresAt: { gt: now } } }),
    prisma.apiCache.count({ where: { expiresAt: { lte: now } } }),
    prisma.apiCache.findMany({
      orderBy: { updatedAt: "desc" },
      take: 25,
      select: {
        key: true,
        source: true,
        fetchedAt: true,
        expiresAt: true,
        updatedAt: true
      }
    })
  ]);

  const bySource = entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.source] = (acc[entry.source] ?? 0) + 1;
    return acc;
  }, {});

  return {
    totalEntries,
    freshEntries,
    expiredEntries,
    bySource,
    recentEntries: entries.map((entry) => ({
      key: entry.key,
      source: entry.source,
      fetchedAt: entry.fetchedAt.toISOString(),
      expiresAt: entry.expiresAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
      isExpired: entry.expiresAt <= now
    }))
  };
}

export async function clearCache(prefix?: string) {
  const result = await prisma.apiCache.deleteMany({
    where: prefix
      ? {
          key: {
            startsWith: prefix
          }
        }
      : undefined
  });

  return {
    deletedEntries: result.count,
    prefix: prefix ?? null,
    clearedAt: new Date().toISOString()
  };
}
