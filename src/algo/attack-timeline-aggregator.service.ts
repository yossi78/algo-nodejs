import { Injectable } from '@nestjs/common';

/**
 * איחוד טווחי תקיפות (Merge Attack Intervals).
 *
 * Time: O(N log N) — מיון לפי זמן התחלה, ואז מעבר יחיד.
 * Space: O(N) — מערך התשובה.
 */
@Injectable()
export class AttackTimelineAggregatorService {
  /**
   * @param intervals טווחי תקיפה [start, end] (שניות מתחילת היום)
   * @returns טווחים מאוחדים, ממוינים לפי התחלה
   */
  solution(intervals: number[][] | null | undefined): number[][] {
    if (intervals == null || intervals.length === 0) {
      return [];
    }

    // Clone so the caller's input is not mutated by sort/merge.
    const sorted = intervals.map((interval) => [...interval]);
    sorted.sort((a, b) => a[0] - b[0]);

    const merged: number[][] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const current = sorted[i];
      const last = merged[merged.length - 1];

      if (current[0] <= last[1]) {
        last[1] = Math.max(last[1], current[1]);
      } else {
        merged.push(current);
      }
    }

    return merged;
  }
}
