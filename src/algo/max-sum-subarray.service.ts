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

function main(): void {
  const service = new MaxSumSubarrayService();
  const cases: Array<[number[], number, number]> = [
    [[2, 1, 5, 1, 3, 2], 3, 9],
    [[2, 3, 4, 1, 5], 2, 7],
    [[1, 2, 3], 5, 0],
    [[5], 1, 5],
  ];
  for (const [requests, k, expected] of cases) {
    const actual = service.solution(requests, k);
    console.log(
      `solution(${JSON.stringify(requests)}, ${k}) = ${actual} (expected ${expected}) ${actual === expected ? 'PASS' : 'FAIL'}`,
    );
  }
}

if (require.main === module) {
  main();
}
