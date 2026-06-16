import { Injectable } from '@nestjs/common';

/**
 * למצוא תת מערך עם הכי הרבה איברים בתנאי שאיבר יכול להופיע רק פעם אחת. חלון זז.
 *
 * Finds the length of the longest contiguous subarray where every element
 * appears at most once.
 *
 * Time: O(N), Space: O(N).
 */
@Injectable()
export class LongestUniqueSubarrayService {
  /**
   * @param a virus identifiers (may be null/undefined or empty)
   * @returns length of the longest valid contiguous subarray, or 0 when empty
   */
  solution(a: number[] | null | undefined): number {
    if (a == null || a.length === 0) {
      return 0;
    }

    const window = new Set<number>();
    let maxLen = 0;
    let left = 0;

    for (let right = 0; right < a.length; right++) {
      while (window.has(a[right])) {
        window.delete(a[left]);
        left++;
      }
      window.add(a[right]);
      maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
  }
}

function main(): void {
  const service = new LongestUniqueSubarrayService();
  const cases: Array<[number[], number]> = [
    [[1, 2, 3, 1, 2], 3],
    [[1, 1, 1, 1], 1],
    [[1, 2, 3, 4], 4],
    [[5, 1, 3, 5, 2, 3, 4, 1], 5],
    [[], 0],
  ];
  for (const [input, expected] of cases) {
    const actual = service.solution(input);
    console.log(
      `solution(${JSON.stringify(input)}) = ${actual} (expected ${expected}) ${actual === expected ? 'PASS' : 'FAIL'}`,
    );
  }
}

if (require.main === module) {
  main();
}
