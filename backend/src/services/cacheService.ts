import { prisma } from "../lib/prisma";

type CacheFactory<T> = () => Promise<T>;

function buildExpiryDate(ttlSeconds: number) {
  return new Date(Date.now() + ttlSeconds * 1000);
}

export async function getOrSetCache<T>(
  key: string,
  ttlSeconds: number,
  factory: CacheFactory<T>,
  source = "jikan"
): Promise<T> {
  const cached = await prisma.apiCache.findUnique({
    where: { key }
  });

  const now = new Date();

  if (cached && cached.expiresAt > now) {
    return JSON.parse(cached.payload) as T;
  }

  const fresh = await factory();
  const payload = JSON.stringify(fresh);

  await prisma.apiCache.upsert({
    where: { key },
    update: {
      payload,
      source,
      fetchedAt: now,
      expiresAt: buildExpiryDate(ttlSeconds)
    },
    create: {
      key,
      payload,
      source,
      fetchedAt: now,
      expiresAt: buildExpiryDate(ttlSeconds)
    }
  });

  return fresh;
}
