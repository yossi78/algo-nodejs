import { Injectable } from '@nestjs/common';

/**
 * Max Network Capacity — אופטימיזציית רוחב פס ברשת (Container With Most Water).
 *
 * בוחר שני עמודי תקשורת כך שקיבולת השידור תהיה מקסימלית:
 *   (right - left) * min(heights[left], heights[right]).
 *
 * Time: O(N) — מעבר יחיד עם שני מצביעים.
 * Space: O(1).
 */
@Injectable()
export class MaxNetworkCapacityService {
  /**
   * @param heights גבהי עמודי תקשורת (אינדקס = מיקום בשורה)
   * @returns קיבולת מקסימלית בין שני עמודים, או 0 אם אין זוג תקף
   */
  solution(heights: number[] | null | undefined): number {
    if (heights == null || heights.length < 2) {
      return 0;
    }

    let left = 0;
    let right = heights.length - 1;
    let maxCapacity = 0;

    while (left < right) {
      const width = right - left;
      const limitingHeight = Math.min(heights[left], heights[right]);
      maxCapacity = Math.max(maxCapacity, width * limitingHeight);

      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }

    return maxCapacity;
  }
}
