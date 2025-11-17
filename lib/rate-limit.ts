import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Simple in-memory rate limiter for MVP (no Redis required)
// For production with Redis, uncomment the Upstash implementation below

class SimpleRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private window: number;

  constructor(limit: number, windowMs: number) {
    this.maxRequests = limit;
    this.window = windowMs;
  }

  async check(identifier: string): Promise<{ success: boolean; remaining: number }> {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < this.window);
    
    if (validRequests.length >= this.maxRequests) {
      return { success: false, remaining: 0 };
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return { success: true, remaining: this.maxRequests - validRequests.length };
  }
}

// Simple rate limiter: 10 requests per minute per IP
export const ratelimit = new SimpleRateLimiter(10, 60000);

// For production with Upstash Redis (optional):
// Uncomment this and add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to .env
/*
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
});
*/
