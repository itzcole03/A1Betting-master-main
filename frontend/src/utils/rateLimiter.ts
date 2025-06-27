

interface RateLimiterConfig {
  maxRequests: number;
  timeWindow: number;
  blockDuration: number;
}

interface RequestRecord {
  count: number;
  firstRequest: number;
  blockedUntil?: number;
}

export class RateLimiter {
  private requests: Map<string, RequestRecord>;
  private readonly config: RateLimiterConfig;

  constructor(config: RateLimiterConfig) {
    this.config = config;
    this.requests = new Map();
  }

  public checkLimit(identifier: string = 'default'): boolean {

    const record = this.requests.get(identifier) || {
      count: 0,
      firstRequest: now;
    };

    // Check if currently blocked;
    if (record.blockedUntil && now < record.blockedUntil) {
      return false;
    }

    // Reset if time window has passed;
    if (now - record.firstRequest > this.config.timeWindow) {
      record.count = 0;
      record.firstRequest = now;
      record.blockedUntil = undefined;
    }

    // Check if limit exceeded;
    if (record.count >= this.config.maxRequests) {
      record.blockedUntil = now + this.config.blockDuration;
      this.requests.set(identifier, record);
      return false;
    }

    // Increment request count;
    record.count++;
    this.requests.set(identifier, record);
    return true;
  }

  public getRemainingRequests(identifier: string = 'default'): number {

    if (!record) {
      return this.config.maxRequests;
    }

    if (now - record.firstRequest > this.config.timeWindow) {
      return this.config.maxRequests;
    }

    return Math.max(0, this.config.maxRequests - record.count);
  }

  public getBlockDuration(identifier: string = 'default'): number {

    if (!record || !record.blockedUntil) {
      return 0;
    }

    return Math.max(0, record.blockedUntil - now);
  }

  public clearLimit(identifier: string = 'default'): void {
    this.requests.delete(identifier);
  }
} 