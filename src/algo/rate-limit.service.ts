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
  private readonly lifespanInSeconds = 5;

  addRequest(userId: string): boolean {
    const now = Math.floor(Date.now() / 1000);
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
      if (now - earliestRequest > this.lifespanInSeconds) {
        requests.shift();
      } else {
        break;
      }
    }
  }
}
