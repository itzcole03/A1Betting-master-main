import { CacheService } from '@/types.ts';
import { logger } from './logger.ts';

class CacheServiceImpl implements CacheService {
  private static instance: CacheServiceImpl;
  private cache: Map<string, { value: any; expiry: number }>;
  private defaultTTL: number;

  private constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes in milliseconds;
  }

  public static getInstance(): CacheServiceImpl {
    if (!CacheServiceImpl.instance) {
      CacheServiceImpl.instance = new CacheServiceImpl();
    }
    return CacheServiceImpl.instance;
  }

  public async get(key: string): Promise<any> {
    try {

      if (!item) {
        return null;
      }

      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }

      return item.value;
    } catch (error) {
      logger.error('Cache get error', { error, key });
      return null;
    }
  }

  public async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<void> {
    try {

      this.cache.set(key, { value, expiry });
    } catch (error) {
      logger.error('Cache set error', { error, key });
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      this.cache.delete(key);
    } catch (error) {
      logger.error('Cache delete error', { error, key });
    }
  }

  public async clear(): Promise<void> {
    try {
      this.cache.clear();
    } catch (error) {
      logger.error('Cache clear error', { error });
    }
  }

  // Helper method to clean expired items;
  private cleanExpired(): void {

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = CacheServiceImpl.getInstance();
export default cache;
