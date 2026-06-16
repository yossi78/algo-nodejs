import { Injectable } from '@nestjs/common';

/**
 * Max Sum Subarray of Size K — תפוקת שיא של שרתי האבטחה.
 *
 * מוצא חלון זמן רציף של בדיוק K שניות עם סכום בקשות HTTP מקסימלי.
 *
 * Time: O(N) — מעבר יחיד; כל הזזת חלון היא O(1).
 * Space: O(1).
 */
@Injectable()
export class MaxSumSubarrayService {
  /**
   * @param requests בקשות HTTP לפי שנייה
   * @param k גודל החלון (שניות)
   * @returns סכום מקסימלי של תת-מערך רציף באורך k, או 0 אם אין חלון תקף
   */
  solution(requests: number[] | null | undefined, k: number): number {
    if (requests == null || k <= 0 || requests.length < k) {
      return 0;
    }

    let windowSum = 0;
    for (let i = 0; i < k; i++) {
      windowSum += requests[i];
    }

    let maxSum = windowSum;
    for (let right = k; right < requests.length; right++) {
      windowSum += requests[right] - requests[right - k];
      maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
  }
}
