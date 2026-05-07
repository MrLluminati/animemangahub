export type CacheHealth = {
  status: string;
  provider: string;
  cacheTable: string;
  totalEntries: number;
  checkedAt: string;
};

export type CacheRecentEntry = {
  key: string;
  source: string;
  fetchedAt: string;
  expiresAt: string;
  updatedAt: string;
  isExpired: boolean;
};

export type CacheStats = {
  totalEntries: number;
  freshEntries: number;
  expiredEntries: number;
  bySource: Record<string, number>;
  recentEntries: CacheRecentEntry[];
};
