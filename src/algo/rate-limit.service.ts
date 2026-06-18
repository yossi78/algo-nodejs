import { Injectable } from '@nestjs/common';

/**
 * Sliding-window rate limiter.
 *
 * שומר לכל משתמש תור של חותמות זמן (בשניות). בקשה מאושרת רק אם מספר
 * הבקשות בחלון החיים (lifespan) קטן מהמקסימום המותר.
 *
 * In Java this relied on ConcurrentHashMap + synchronized; Node.js runs the
 * event loop on a single thread, so a plain Map is already safe here.
 */
@Injectable()
export class RateLimitService {
  private readonly userRequestsMap = new Map<string, number[]>();
  private readonly maxSizeOfRequests = 5;
  private readonly lifespanInMillis = 5 * 1000;

  addRequest(userId: string): boolean {
    const now = Date.now();
    let requests = this.userRequestsMap.get(userId);
    if (requests == null) {
      requests = [];
      this.userRequestsMap.set(userId, requests);
    }

    this.removeOutdated(requests, now);
    if (requests.length >= this.maxSizeOfRequests) {
      return false;
    }
    requests.push(now);
    return true;
  }

  private removeOutdated(requests: number[], now: number): void {
    while (requests.length > 0) {
      const earliestRequest = requests[0];
      if (now - earliestRequest > this.lifespanInMillis) {
        requests.shift();
      } else {
        break;
      }
    }
  }
}

async function main(): Promise<void> {
  const limiter = new RateLimitService();
  const userId = 'user-1';

  console.log('Sending 7 requests in a burst (limit is 5):');
  for (let i = 1; i <= 7; i++) {
    const allowed = limiter.addRequest(userId);
    console.log(`  request #${i}: ${allowed ? 'ALLOWED' : 'BLOCKED'}`);
  }

  console.log('\nWaiting 5.5s for the window to expire...');
  await new Promise((resolve) => setTimeout(resolve, 5500));

  console.log('Sending 1 more request after the window expired:');
  console.log(
    `  request #8: ${limiter.addRequest(userId) ? 'ALLOWED' : 'BLOCKED'}`,
  );
}

void main();
