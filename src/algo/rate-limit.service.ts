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

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function main(): Promise<void> {
  const service = new RateLimitService();
  const userId = 'user-1';

  console.log('Sending 7 requests in a burst (limit is 5 per 5s):');
  for (let i = 1; i <= 7; i++) {
    const allowed = service.addRequest(userId);
    console.log(`  request #${i}: ${allowed ? 'ALLOWED' : 'BLOCKED'}`);
  }

  console.log('\nWaiting 6 seconds for the window to expire...');
  await sleep(6000);

  console.log('Sending another request after the window:');
  const allowedAfterWait = service.addRequest(userId);
  console.log(`  request #8: ${allowedAfterWait ? 'ALLOWED' : 'BLOCKED'}`);

  console.log('\nA different user is independent:');
  console.log(
    `  user-2 request #1: ${service.addRequest('user-2') ? 'ALLOWED' : 'BLOCKED'}`,
  );
}

if (require.main === module) {
  void main();
}
