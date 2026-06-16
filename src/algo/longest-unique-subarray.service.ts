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
